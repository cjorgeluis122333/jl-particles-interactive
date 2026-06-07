import React, { useEffect, useRef } from 'react';
import { BackgroundCanvas } from '../../types/background';
import { FollowPointerParticle } from './FollowPointerParticle';

export interface BackgroundParticleEngineProps {
  config: BackgroundCanvas;
  backgroundColor: string;
}

export default function BackgroundParticleEngine({ config, backgroundColor }: BackgroundParticleEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FollowPointerParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false, active: false });
  const swarmRef = useRef({ x: 0, y: 0, initialized: false });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const configRef = useRef(config);
  const colorInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const colorIndex = useRef(0);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    if (colorInterval.current) {
      clearInterval(colorInterval.current);
      colorInterval.current = null;
    }

    if (!config.colors || config.colors.length === 0) {
      const defaultColor = config.color || '#8B5CF6';
      particlesRef.current.forEach(p => {
        p.targetColor = defaultColor;
        p.colorDelay = Math.random() * 20;
      });
      return;
    }

    const triggerWave = (color: string) => {
      const mx = mouseRef.current.active ? mouseRef.current.x : swarmRef.current.x;
      const my = mouseRef.current.active ? mouseRef.current.y : swarmRef.current.y;

      particlesRef.current.forEach(p => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        p.targetColor = color;
        p.colorDelay = Math.max(0, dist * 0.15);
      });
    };

    if (config.colorMode === 'mixed') {
      particlesRef.current.forEach((p, i) => {
        p.targetColor = config.colors![i % config.colors!.length];
        p.colorDelay = Math.random() * 20;
      });
    } else {
      // Wave mode (default)
      colorIndex.current = 0;
      triggerWave(config.colors[0]);

      if (config.colors.length > 1) {
        colorInterval.current = setInterval(() => {
          const colors = config.colors!;
          colorIndex.current = (colorIndex.current + 1) % colors.length;
          triggerWave(colors[colorIndex.current]);
        }, 3000);
      }
    }

    return () => {
      if (colorInterval.current) {
        clearInterval(colorInterval.current);
      }
    };
  }, [config.colors, config.color, config.colorMode]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || configRef.current.name === 'NONE') return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }

        particlesRef.current = [];
        const baseCount = 350;
        const targetCount = Math.floor(baseCount * (configRef.current.density ?? 1.0));

        const colors = configRef.current.colors;
        const colorMode = configRef.current.colorMode || 'wave';

        for (let i = 0; i < targetCount; i++) {
          const radius = Math.sqrt(Math.random()) * 350;
          const angle = Math.random() * Math.PI * 2;
          const relX = Math.cos(angle) * radius;
          const relY = Math.sin(angle) * radius;

          let color: string;
          if (colors && colors.length > 0) {
            color = colorMode === 'mixed' ? colors[i % colors.length] : colors[0];
          } else if (configRef.current.color) {
            color = configRef.current.color;
          } else {
            const ratio = Math.max(0, Math.min(1, (relX + 350) / 700));
            const hue = 210 + ratio * 130 + (Math.random() * 15 - 7.5);
            const saturation = 75 + Math.random() * 25;
            const lightness = 60 + Math.random() * 15;
            color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          }

          particlesRef.current.push(new FollowPointerParticle(relX, relY, color));
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const ctx = canvas.getContext('2d')!;
    let time = 0;

    const render = () => {
      const rect = container.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      if (!swarmRef.current.initialized) {
        swarmRef.current.x = rect.width / 2;
        swarmRef.current.y = rect.height / 2;
        swarmRef.current.initialized = true;
      }

      if (configRef.current.name === 'FOLLOW_POINTER') {
        let targetSwarmX = rect.width / 2;
        let targetSwarmY = rect.height / 2;

        const mx = mouseRef.current.active ? mouseRef.current.x : null;
        const my = mouseRef.current.active ? mouseRef.current.y : null;

        if (mx !== null && my !== null) {
          targetSwarmX = mx;
          targetSwarmY = my;
        }

        const trackingSpeed = configRef.current.pointerTrackingSpeed ?? 0.06;
        swarmRef.current.x += (targetSwarmX - swarmRef.current.x) * trackingSpeed;
        swarmRef.current.y += (targetSwarmY - swarmRef.current.y) * trackingSpeed;

        const particleSpeed = configRef.current.particleSpeed ?? 1.0;
        time += 0.012 * particleSpeed;

        const particles = particlesRef.current;

        // Separation / Anti-collision pass
        const minDist = 18;
        const minDistSq = minDist * minDist;

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < minDistSq && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const pushForce = (minDist - dist) / minDist;

              const pushX = (dx / dist) * pushForce * 0.8;
              const pushY = (dy / dist) * pushForce * 0.8;

              p1.x += pushX;
              p1.y += pushY;
              p2.x -= pushX;
              p2.y -= pushY;

              p1.vx += pushX * 0.1;
              p1.vy += pushY * 0.1;
              p2.vx -= pushX * 0.1;
              p2.vy -= pushY * 0.1;
            }
          }
        }

        for (const p of particles) {
          p.update(mx, my, swarmRef.current.x, swarmRef.current.y, rect.width, rect.height, time, configRef.current.orientation);
          const drawShape = configRef.current.shape || 'bean';
          p.draw(ctx, time, drawShape);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [backgroundColor, config.density]);

  if (config.name === 'NONE') return null;

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
