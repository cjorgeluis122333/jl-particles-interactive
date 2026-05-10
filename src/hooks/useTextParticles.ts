import React, { useEffect, useRef } from 'react';
import { Particle } from '../components/Particle';

/**
 * Creates an offscreen canvas to draw the requested text and extracts the coordinates
 * of non-transparent pixels, serving as targets for the particles.
 */
function getPixelsForText(text: string, width: number, height: number): {x: number, y: number}[] {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return [];

    ctx.clearRect(0, 0, width, height);

    // Responsive font size relative to screen
    let fontSize = Math.min(width, height) * 0.65;
    ctx.font = `bold ${fontSize}px "Georgia", serif`;
    
    // Scale text down if it's too wide
    const textMetrics = ctx.measureText(text);
    if (textMetrics.width > width * 0.9) {
        fontSize = fontSize * (width * 0.9) / textMetrics.width;
        ctx.font = `bold ${fontSize}px "Georgia", serif`;
    }

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Shift the text slightly up since many fonts have extra bottom padding
    ctx.fillText(text, width / 2, height / 2.05);

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const points = [];

    // Analyze pixels. We step by "gap" to skip pixels and optimize the amount of points.
    const gap = window.innerWidth < 600 ? 5 : 6;
    for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
            const index = (y * width + x) * 4;
            const alpha = pixels[index + 3]; // get Alpha channel
            
            if (alpha > 128) {
                // Add a tiny bit of random jitter to scatter the shape organically
                points.push({ 
                    x: x + (Math.random() - 0.5) * 4, 
                    y: y + (Math.random() - 0.5) * 4 
                });
            }
        }
    }
    return points;
}

export function useTextParticles(text: string, particlesRef: React.MutableRefObject<Particle[]>, containerRef: React.RefObject<HTMLElement | null>) {
    const textRef = useRef<string>(text);

    useEffect(() => {
        textRef.current = text;
    }, [text]);

    const updateTextTargets = (char: string, w?: number, h?: number) => {
        const width = w || containerRef.current?.offsetWidth || window.innerWidth;
        const height = h || containerRef.current?.offsetHeight || window.innerHeight;
        
        if (!char) {
            // Disperse randomly across the screen but within a slightly padded bounding box
            const padding = 50;
            particlesRef.current.forEach(p => {
                p.targetX = padding + Math.random() * (width - padding * 2);
                p.targetY = padding + Math.random() * (height - padding * 2);
            });
            return;
        }

        const points = getPixelsForText(char, width, height);
        if (points.length === 0) return;

        // Sort both points and particles by X-coordinate
        const sortedPoints = [...points].sort((a, b) => a.x - b.x);
        const sortedParticleIndices = Array.from({ length: particlesRef.current.length }, (_, i) => i)
            .sort((a, b) => particlesRef.current[a].x - particlesRef.current[b].x);

        // To prevent wild vertical swapping, chunk them by sqrt(N) and sort each chunk by Y
        const chunkSize = Math.ceil(Math.sqrt(sortedParticleIndices.length));
        
        for (let i = 0; i < sortedParticleIndices.length; i += chunkSize) {
            const end = Math.min(i + chunkSize, sortedParticleIndices.length);
            
            // Extract chunks
            const pIndicesChunk = sortedParticleIndices.slice(i, end);
            const ptsChunk = [];
            
            for (let j = i; j < end; j++) {
                ptsChunk.push(sortedPoints[j % sortedPoints.length]);
            }

            // Sort chunks by Y
            pIndicesChunk.sort((a, b) => particlesRef.current[a].y - particlesRef.current[b].y);
            ptsChunk.sort((a, b) => a.y - b.y);

            // Assign targets
            for (let j = 0; j < pIndicesChunk.length; j++) {
                const particleIndex = pIndicesChunk[j];
                const p = particlesRef.current[particleIndex];
                const pt = ptsChunk[j];
                
                p.targetX = pt.x;
                p.targetY = pt.y;
            }
        }
    };

    return { getPixelsForText, updateTextTargets, textRef };
}
