import React, { useEffect, useRef } from 'react';
import { BackgroundCanvas } from '../../types/background';
import { ParticleShape } from '../../types';

export interface JellyfishParticleEngineProps {
  config: BackgroundCanvas;
  backgroundColor: string;
}

class JellyfishParticle {
  x: number = 0;
  y: number = 0;
  baseX: number;
  baseY: number;
  vx: number = 0;
  vy: number = 0;
  color: string;
  size: number;
  angle: number;
  dist: number;
  spring: number;
  friction: number;
  targetColor: string | null = null;
  colorDelay: number = 0;

  constructor(baseX: number, baseY: number, color: string, size: number) {
    this.baseX = baseX;
    this.baseY = baseY;
    this.color = color;
    this.size = size;
    this.angle = Math.atan2(baseY, baseX);
    this.dist = Math.sqrt(baseX * baseX + baseY * baseY);

    // Core particles have tight springs; outer particles (tentacles) have loose springs
    const normalizedDist = Math.min(1, this.dist / 350);
    this.spring = 0.15 - normalizedDist * 0.13;  // 0.15 for core, 0.02 for outer
    this.friction = 0.85 + normalizedDist * 0.1; // outer particles glide more smoothly (0.95)
  }

  update(swarmX: number, swarmY: number, time: number, pulse: number) {
    const lobeAmount = 0.05;
    const irregularity = 1 +
      Math.sin(this.angle * 3 + time * 1.2) * lobeAmount +
      Math.cos(this.angle * 5 - time * 0.6) * (lobeAmount * 0.6);

    const currentDist = this.dist * pulse * irregularity;

    const localX = Math.cos(this.angle) * currentDist;
    const localY = Math.sin(this.angle) * currentDist;

    const waveAmt = this.dist * 0.1 * irregularity;
    const wave = Math.sin(time * 3 + this.dist * 0.05) * waveAmt;

    const targetX = swarmX + localX + Math.cos(this.angle + Math.PI / 2) * wave;
    const targetY = swarmY + localY + Math.sin(this.angle + Math.PI / 2) * wave;

    const dx = targetX - this.x;
    const dy = targetY - this.y;

    this.vx += dx * this.spring;
    this.vy += dy * this.spring;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    if (this.targetColor) {
      this.colorDelay -= 1;
      if (this.colorDelay <= 0) {
        this.color = this.targetColor;
        this.targetColor = null;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, shape: ParticleShape, scale: number) {
    const normalizedDist = Math.min(1, this.dist / 350);

    const depthScale = 1 + (1 - normalizedDist) * (scale - 1) * 1.5;
    const currentSize = this.size * depthScale;

    ctx.globalAlpha = Math.max(0.15, 1 - normalizedDist * 0.7);

    ctx.fillStyle = this.color;
    ctx.beginPath();

    if (shape === 'circle') {
      ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
    } else if (shape === 'square') {
      ctx.rect(this.x - currentSize, this.y - currentSize, currentSize * 2, currentSize * 2);
    } else { // bean
      ctx.ellipse(this.x, this.y, currentSize * 1.5, currentSize, 0, 0, Math.PI * 2);
    }

    ctx.fill();
  }
}

export default function JellyfishParticleEngine({ config, backgroundColor }: JellyfishParticleEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<JellyfishParticle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const swarmRef = useRef({ x: 0, y: 0, initialized: false, angle: -Math.PI / 2 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const configRef = useRef(config);
  const colorIndex = useRef(0);
  const colorInterval = useRef<ReturnType<typeof setInterval> | null>(null);

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
      particlesRef.current.forEach(p => {
        p.targetColor = color;
        p.colorDelay = Math.max(0, p.dist * 0.2);
      });
    };

    if (config.colorMode === 'mixed') {
      particlesRef.current.forEach((p, i) => {
        p.targetColor = config.colors![i % config.colors!.length];
        p.colorDelay = Math.max(0, p.dist * 0.2) + Math.random() * 10;
      });
    } else {
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
    if (!containerRef.current || !canvasRef.current) return;

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
          const t = Math.random() * Math.PI * 2;
          const r = Math.sqrt(Math.random()) * 350;

          const relX = Math.cos(t) * r;
          const relY = Math.sin(t) * r;

          let color: string;
          if (colors && colors.length > 0) {
            color = colorMode === 'mixed' ? colors[i % colors.length] : colors[0];
          } else if (configRef.current.color) {
            color = configRef.current.color;
          } else {
            const hue = 260 + Math.random() * 60;
            const saturation = 70 + Math.random() * 30;
            const lightness = 60 + Math.random() * 20;
            color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          }

          let sizeBase = 2 + Math.random() * 2;
          if (r > 200) sizeBase *= 0.6;
          if (r < 80) sizeBase *= 1.5;

          const p = new JellyfishParticle(relX, relY, color, sizeBase);
          p.x = width / 2;
          p.y = height / 2;

          particlesRef.current.push(p);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const ctx = canvas.getContext('2d')!;
    let time = 0;

    const render = () => {
      const rect = container.getBoundingClientRect();

      ctx.globalCompositeOperation = 'source-over';

      if (backgroundColor === 'transparent') {
        ctx.clearRect(0, 0, rect.width, rect.height);
      } else {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      if (!swarmRef.current.initialized) {
        swarmRef.current.x = rect.width / 2;
        swarmRef.current.y = rect.height / 2;
        swarmRef.current.initialized = true;
      }

      let targetSwarmX = rect.width / 2;
      let targetSwarmY = rect.height / 2;

      const mx = mouseRef.current.active ? mouseRef.current.x : null;
      const my = mouseRef.current.active ? mouseRef.current.y : null;

      if (mx !== null && my !== null) {
        targetSwarmX = mx;
        targetSwarmY = my;
      }

      const dx = targetSwarmX - swarmRef.current.x;
      const dy = targetSwarmY - swarmRef.current.y;

      const distToTarget = Math.sqrt(dx * dx + dy * dy);
      let dirX = 0;
      let dirY = 0;

      if (distToTarget > 1) {
        dirX = dx / distToTarget;
        dirY = dy / distToTarget;
        swarmRef.current.angle = Math.atan2(dirY, dirX);
      } else {
        dirX = Math.cos(swarmRef.current.angle);
        dirY = Math.sin(swarmRef.current.angle);
      }

      const particleSpeed = configRef.current.particleSpeed ?? 1.0;
      time += 0.02 * particleSpeed;

      // Pulse logic for swimming motion
      const pulseCycle = time % 4;
      let expansion = 1;
      let scale = 1;
      let forwardBoost = 0;

      if (pulseCycle < 1) {
        const t = pulseCycle;
        expansion = 1 - Math.sin(t * Math.PI) * 0.3;
        scale = 1 + Math.sin(t * Math.PI) * 0.15;
        forwardBoost = Math.sin(t * Math.PI) * 12;
      } else {
        const t = (pulseCycle - 1) / 3;
        expansion = 0.7 + 0.3 * Math.sin(t * Math.PI / 2);
        scale = 1.0;
        forwardBoost = 0;
      }

      const trackingSpeed = configRef.current.pointerTrackingSpeed ?? 0.02;
      swarmRef.current.x += dx * trackingSpeed;
      swarmRef.current.y += dy * trackingSpeed;

      swarmRef.current.x += dirX * forwardBoost * particleSpeed;
      swarmRef.current.y += dirY * forwardBoost * particleSpeed;

      // Subtle ambient glow
      const glowScale = scale + (pulseCycle < 1 ? pulseCycle * 0.15 : 0);
      const gradientRadius = 200 * glowScale;

      const gradient = ctx.createRadialGradient(
        swarmRef.current.x, swarmRef.current.y, 0,
        swarmRef.current.x, swarmRef.current.y, gradientRadius
      );
      gradient.addColorStop(0, 'rgba(80, 150, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(80, 150, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(swarmRef.current.x, swarmRef.current.y, gradientRadius, 0, Math.PI * 2);
      ctx.fill();

      const particles = particlesRef.current;
      ctx.globalCompositeOperation = 'source-over';

      for (const p of particles) {
        p.update(swarmRef.current.x, swarmRef.current.y, time, expansion);
        const drawShape = configRef.current.shape || 'circle';
        p.draw(ctx, drawShape, scale);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [backgroundColor, config.density]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  );
}
