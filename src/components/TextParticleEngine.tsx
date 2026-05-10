import React, { useEffect, useRef } from 'react';
import { Particle } from './Particle';
import { useTextParticles } from '../hooks/useTextParticles';

import { useParticleInteraction, ClickMode } from '../hooks/useParticleInteraction';
import { ParticleShape } from '../App';

interface TextParticleEngineProps {
  text: string;
  particleColor?: string | string[];
  particleSize?: number;
  particleDensity?: number;
  particleEase?: number;
  isMagnet?: boolean;
  clickMode?: ClickMode;
  particleShape?: ParticleShape;
  backgroundColor?: string;
}

// Helper to convert hex to rgb for trailing effect
const hexToRgb = (hex: string | undefined | null) => {
    if (!hex || typeof hex !== 'string') return '0, 0, 0';
    try {
        let r = 0, g = 0, b = 0;
        // 3 digits
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        // 6 digits
        else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        return `${r}, ${g}, ${b}`;
    } catch (e) {
        return '0, 0, 0';
    }
};

export default function TextParticleEngine({ 
    text, 
    particleColor = '255, 255, 255', 
    particleSize = 1, 
    particleDensity = 1, 
    particleEase = 1, 
    isMagnet = true, 
    clickMode = 'none', 
    particleShape = 'circle',
    backgroundColor = '#050505'
}: TextParticleEngineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>(0);
    const timeRef = useRef<number>(0);
    const mouseRef = useParticleInteraction(containerRef);
    
    const configRef = useRef({ isMagnet, clickMode, particleShape, backgroundColor });
    configRef.current = { isMagnet, clickMode, particleShape, backgroundColor };
    
    // El hook useTextParticles ahora maneja todo el flujo de obtener los puntos del texto
    const { updateTextTargets, textRef } = useTextParticles(text, particlesRef, containerRef);

    const initParticles = (w: number, h: number, currentDensity: number = 1) => {
        const baseCount = window.innerWidth < 600 ? 1500 : 3000;
        const count = Math.floor(baseCount * currentDensity);
        const pts = [];
        for (let i = 0; i < count; i++) {
            const p = new Particle(w, h, particleColor);
            p.sizeMultiplier = particleSize;
            p.easeMultiplier = particleEase;
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

    // Update size multiplier
    useEffect(() => {
        if (particlesRef.current.length > 0) {
            particlesRef.current.forEach(p => {
                p.sizeMultiplier = particleSize;
            });
        }
    }, [particleSize]);

    // Update ease multiplier
    useEffect(() => {
        if (particlesRef.current.length > 0) {
            particlesRef.current.forEach(p => {
                p.easeMultiplier = particleEase;
            });
        }
    }, [particleEase]);

    // Update density
    useEffect(() => {
        if (particlesRef.current.length > 0 && canvasRef.current && containerRef.current) {
            const baseCount = window.innerWidth < 600 ? 1500 : 3000;
            const targetCount = Math.floor(baseCount * particleDensity);
            const currentCount = particlesRef.current.length;
            
            if (targetCount > currentCount) {
                const rect = containerRef.current.getBoundingClientRect();
                for (let i = 0; i < targetCount - currentCount; i++) {
                    const p = new Particle(rect.width, rect.height, particleColor);
                    p.sizeMultiplier = particleSize;
                    particlesRef.current.push(p);
                }
                // We need to fetch targets again so new particles get a target instead of jumping to 0,0
                updateTextTargets(text);
            } else if (targetCount < currentCount) {
                particlesRef.current.splice(targetCount);
            }
        }
    }, [particleDensity]);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
             for (let entry of entries) {
                 const { width, height } = entry.contentRect;
                 const dpr = window.devicePixelRatio || 1;
                 
                 canvas.width = width * dpr;
                 canvas.height = height * dpr;
                 canvas.style.width = `${width}px`;
                 canvas.style.height = `${height}px`;
                 
                 const ctx = canvas.getContext('2d');
                 if(ctx) {
                     ctx.scale(dpr, dpr);
                 }

                 if (particlesRef.current.length === 0) {
                     initParticles(width, height, particleDensity);
                 } else {
                     // Adjust particles inside bounds maybe, but targets are updated anyway
                 }
                 
                 updateTextTargets(text, width, height);
             }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(container);

        const ctx = canvas.getContext('2d')!;

        const render = () => {
            timeRef.current++;
            const rect = container.getBoundingClientRect();
            
            const { isMagnet: currentMagnet, clickMode: currentClickMode, particleShape: currentShape, backgroundColor: currentBg } = configRef.current;
            const rgbBg = hexToRgb(currentBg);
            
            ctx.fillStyle = `rgba(${rgbBg}, 0.25)`;
            ctx.fillRect(0, 0, rect.width, rect.height);
            
            // Si el fondo es claro, usamos 'multiply' o 'darken' o simplemente nada. 
            // Pero por ahora mantendremos screen si es oscuro o probaremos lighten
            ctx.globalCompositeOperation = 'screen';
            
            const isActive = textRef.current !== '';
            
            const mx = mouseRef.current.active ? mouseRef.current.x : null;
            const my = mouseRef.current.active ? mouseRef.current.y : null;
            const isDown = mouseRef.current.isDown;

            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                p.update(timeRef.current, !!isActive, mx, my, isDown, currentMagnet, currentClickMode);
                p.draw(ctx, currentShape);
            }
            
            ctx.globalCompositeOperation = 'source-over';
            animationFrameRef.current = requestAnimationFrame(render);
        };
        
        render();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateTextTargets(text);
    }, [text]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
