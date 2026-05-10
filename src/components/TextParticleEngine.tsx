import React, { useEffect, useRef } from 'react';
import { Particle } from './Particle';
import { useTextParticles } from '../hooks/useTextParticles';

interface TextParticleEngineProps {
  text: string;
  particleColor?: string | string[];
  particleSize?: number;
}

export default function TextParticleEngine({ text, particleColor = '255, 255, 255', particleSize = 1 }: TextParticleEngineProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>(0);
    const timeRef = useRef<number>(0);
    
    // El hook useTextParticles ahora maneja todo el flujo de obtener los puntos del texto
    const { updateTextTargets, textRef } = useTextParticles(text, particlesRef, containerRef);

    const initParticles = (w: number, h: number) => {
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

    // Update size multiplier
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
                 
                 canvas.width = width * dpr;
                 canvas.height = height * dpr;
                 canvas.style.width = `${width}px`;
                 canvas.style.height = `${height}px`;
                 
                 const ctx = canvas.getContext('2d');
                 if(ctx) {
                     ctx.scale(dpr, dpr);
                 }

                 if (particlesRef.current.length === 0) {
                     initParticles(width, height);
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
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.fillRect(0, 0, rect.width, rect.height);
            
            ctx.globalCompositeOperation = 'screen';
            
            const isActive = textRef.current !== '';

            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                p.update(timeRef.current, !!isActive);
                p.draw(ctx);
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
