import React, { useEffect, useRef } from 'react';
import { Particle } from '../components/Particle';

/**
 * Creates an offscreen canvas to draw the requested text and extracts the coordinates
 * of non-transparent pixels, serving as targets for the particles.
 */
function getPixelsForText(text: string, width: number, height: number): {x: number, y: number}[] {
    if (width <= 0 || height <= 0) return [];
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
    const gap = window.innerWidth < 600 ? 6 : 8;
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
                const targetX = padding + Math.random() * (width - padding * 2);
                const targetY = padding + Math.random() * (height - padding * 2);
                
                if (Math.abs(targetX - p.x) > 20 || Math.abs(targetY - p.y) > 20) {
                     p.vx += (Math.random() - 0.5) * 20;
                     p.vy += (Math.random() - 0.5) * 20;
                }
                
                p.targetX = targetX;
                p.targetY = targetY;
            });
            return;
        }

        const points = getPixelsForText(char, width, height);
        if (points.length === 0) return;

        // Add 15% noise to sorting key for organic crossing of paths rather than strict rigid blocks
        const noiseFactor = width * 0.15; 
        const ptsWithKeys = points.map(pt => ({ pt, key: pt.x + (Math.random() - 0.5) * noiseFactor }));
        ptsWithKeys.sort((a, b) => a.key - b.key);
        const sortedPoints = ptsWithKeys.map(k => k.pt);

        const indicesWithKeys = particlesRef.current.map((p, i) => ({ i, key: p.x + (Math.random() - 0.5) * noiseFactor }));
        indicesWithKeys.sort((a, b) => a.key - b.key);
        const sortedParticleIndices = indicesWithKeys.map(k => k.i);

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
                
                const distanceX = pt.x - p.x;
                const distanceY = pt.y - p.y;
                
                // Add organic impulse on reassignment
                if (Math.abs(distanceX) > 20 || Math.abs(distanceY) > 20) {
                     p.vx += (Math.random() - 0.5) * 20;
                     p.vy += (Math.random() - 0.5) * 20;
                     
                     // Tangential velocity for arced movement
                     const arcStrength = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
                     p.vx += Math.sign(distanceY) * arcStrength;
                     p.vy -= Math.sign(distanceX) * arcStrength;
                }
                
                p.targetX = pt.x;
                p.targetY = pt.y;
            }
        }
    };

    return { getPixelsForText, updateTextTargets, textRef };
}
