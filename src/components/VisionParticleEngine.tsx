import React, { useEffect, useRef } from 'react';
import { Landmark, FaceLandmarker } from '@mediapipe/tasks-vision';
import { Particle } from './Particle';

interface VisionParticleEngineProps {
  handLandmarks?: Landmark[][] | null;
  faceLandmarks?: Landmark[][] | null;
  particleColor?: string | string[];
  particleSize?: number;
}

function getPixelsForVision(handLandmarks: Landmark[][] | null | undefined, faceLandmarks: Landmark[][] | null | undefined, width: number, height: number): {x: number, y: number}[] {
    const points: {x: number, y: number}[] = [];
    
    const isMobile = window.innerWidth < 600;

    // --- Face Processing ---
    if (faceLandmarks && faceLandmarks.length > 0) {
        const faceConnections = FaceLandmarker.FACE_LANDMARKS_TESSELATION;
        const pointsPerSegment = isMobile ? 1 : 2;
        
        faceLandmarks.forEach(face => {
            if (faceConnections) {
                faceConnections.forEach((conn) => {
                    const start = face[conn.start];
                    const end = face[conn.end];
                    
                    if (start && end) {
                        for (let i = 0; i <= pointsPerSegment; i++) {
                            const t = i / pointsPerSegment;
                            const x = start.x + (end.x - start.x) * t;
                            const y = start.y + (end.y - start.y) * t;
                            
                            points.push({
                                x: (1 - x) * width + (Math.random() - 0.5) * 4,
                                y: y * height + (Math.random() - 0.5) * 4
                            });
                        }
                    }
                });
            } else {
                const pointsPerFaceLandmark = isMobile ? 2 : 4;
                face.forEach(joint => {
                    for (let i=0; i < pointsPerFaceLandmark; i++) {
                        points.push({
                            x: (1 - joint.x) * width + (Math.random() - 0.5) * 5,
                            y: joint.y * height + (Math.random() - 0.5) * 5
                        });
                    }
                });
            }
        });
    }

    // --- Hand Processing ---
    if (handLandmarks && handLandmarks.length > 0) {
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
            [0, 5], [5, 6], [6, 7], [7, 8], // Index
            [5, 9], [9, 10], [10, 11], [11, 12], // Middle
            [9, 13], [13, 14], [14, 15], [15, 16], // Ring
            [13, 17], [17, 18], [18, 19], [19, 20], // Pinky
            [0, 17] // Palm
        ];

        const pointsPerSegment = isMobile ? 8 : 12;

        handLandmarks.forEach(hand => {
            connections.forEach(([startIdx, endIdx]) => {
                const start = hand[startIdx];
                const end = hand[endIdx];
                
                for (let i = 0; i <= pointsPerSegment; i++) {
                    const t = i / pointsPerSegment;
                    const x = start.x + (end.x - start.x) * t;
                    const y = start.y + (end.y - start.y) * t;
                    
                    points.push({
                        x: (1 - x) * width + (Math.random() - 0.5) * 6,
                        y: y * height + (Math.random() - 0.5) * 6
                    });
                }
            });
            
            hand.forEach(joint => {
               for (let i=0; i < (isMobile ? 2 : 4); i++) {
                  points.push({
                      x: (1 - joint.x) * width + (Math.random() - 0.5) * 10,
                      y: joint.y * height + (Math.random() - 0.5) * 10
                  });
               }
            });
        });
    }

    return points;
}

export default function VisionParticleEngine({ handLandmarks, faceLandmarks, particleColor = '255, 255, 255', particleSize = 1 }: VisionParticleEngineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const handLandmarksRef = useRef<Landmark[][] | null | undefined>(handLandmarks);
    const faceLandmarksRef = useRef<Landmark[][] | null | undefined>(faceLandmarks);
    
    useEffect(() => {
        handLandmarksRef.current = handLandmarks;
    }, [handLandmarks]);

    useEffect(() => {
        faceLandmarksRef.current = faceLandmarks;
    }, [faceLandmarks]);

    const initParticles = (w: number, h: number) => {
        // Less particles on mobile to maintain 60fps, increased overall number for face details
        const count = window.innerWidth < 600 ? 3000 : 5000;
        const pts = [];
        for (let i = 0; i < count; i++) {
            const p = new Particle(w, h, particleColor);
            p.sizeMultiplier = particleSize;
            pts.push(p);
        }
        particlesRef.current = pts;
    };
    
    // Update color sequentially
    useEffect(() => {
        if (particlesRef.current.length > 0) {
            particlesRef.current.forEach(p => {
                p.baseColor = Array.isArray(particleColor) 
                    ? particleColor[Math.floor(Math.random() * particleColor.length)] 
                    : particleColor;
            });
        }
    }, [particleColor]);

    // Update size sequentially
    useEffect(() => {
        if (particlesRef.current.length > 0) {
            particlesRef.current.forEach(p => {
                p.sizeMultiplier = particleSize;
            });
        }
    }, [particleSize]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
             for (let entry of entries) {
                 const { width, height } = entry.contentRect;
                 const dpr = window.devicePixelRatio || 1;
                 
                 // Handle High-DPI screens
                 canvas.width = width * dpr;
                 canvas.height = height * dpr;
                 canvas.style.width = `${width}px`;
                 canvas.style.height = `${height}px`;
                 
                 const ctx = canvas.getContext('2d');
                 if(ctx) {
                     ctx.scale(dpr, dpr);
                 }

                 // Initialize if empty
                 if (particlesRef.current.length === 0) {
                     initParticles(width, height);
                 }
             }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        const ctx = canvas.getContext('2d')!;

        const render = () => {
            timeRef.current++;
            
            const rect = container.getBoundingClientRect();

            const hasHands = handLandmarksRef.current && handLandmarksRef.current.length > 0;
            const hasFaces = faceLandmarksRef.current && faceLandmarksRef.current.length > 0;

            if (hasHands || hasFaces) {
                const points = getPixelsForVision(handLandmarksRef.current, faceLandmarksRef.current, rect.width, rect.height);
                if (points.length > 0) {
                   particlesRef.current.forEach((p, i) => {
                       const pt = points[i % points.length];
                       // Smoother blending towards hand target, no shuffle to prevent jitter
                       p.targetX = p.targetX + (pt.x - p.targetX) * 0.15;
                       p.targetY = p.targetY + (pt.y - p.targetY) * 0.15;
                   });
                }
            }
            
            // Motion blur/trail effect background clear - Dark minimal theme
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(0, 0, rect.width, rect.height);
            
            // Glowing additive blending for particles
            ctx.globalCompositeOperation = 'screen';
            
            const isActive = hasHands || hasFaces;

            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                p.update(timeRef.current, !!isActive);
                p.draw(ctx);
            }
            
            // Reset composite mode
            ctx.globalCompositeOperation = 'source-over';

            animationFrameRef.current = requestAnimationFrame(render);
        };
        
        render();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run setup on initial mount

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
