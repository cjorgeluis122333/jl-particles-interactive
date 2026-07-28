import React, { useEffect, useRef } from 'react';
import { BackgroundCanvas } from '../../types/background';
import { ParticleShape } from '../../types';

export interface NetParticleEngineProps {
  config: BackgroundCanvas;
  backgroundColor: string;
}

class NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  currentColor: string = '#8B5CF6';
  targetColor: string | null = null;
  colorDelay: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.5 + 0.1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = Math.random() * 1.5 + 1;
  }

  update(
    width: number,
    height: number,
    mouseX: number | null,
    mouseY: number | null,
    particleSpeed: number = 1.0,
    trackingSpeed: number = 0.06
  ) {
    this.x += this.vx * particleSpeed;
    this.y += this.vy * particleSpeed;

    // Bounce off edges
    if (this.x < 0) { this.x = 0; this.vx *= -1; }
    else if (this.x > width) { this.x = width; this.vx *= -1; }

    if (this.y < 0) { this.y = 0; this.vy *= -1; }
    else if (this.y > height) { this.y = height; this.vy *= -1; }

    // React to mouse
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distSq = dx * dx + dy * dy;
      const interactionRadius = 150;
      const interactionSq = interactionRadius * interactionRadius;

      if (distSq < interactionSq) {
        const dist = Math.sqrt(distSq);
        const force = (interactionRadius - dist) / interactionRadius;
        const repulsionMult = trackingSpeed / 0.06;
        this.x -= (dx / dist) * force * 2 * repulsionMult;
        this.y -= (dy / dist) * force * 2 * repulsionMult;
      }
    }

    if (this.targetColor) {
      this.colorDelay -= 1 * particleSpeed;
      if (this.colorDelay <= 0) {
        this.currentColor = this.targetColor;
        this.targetColor = null;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, shape: ParticleShape = 'circle', time: number = 0) {
    ctx.fillStyle = this.currentColor;
    if (shape === 'square') {
      ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    } else if (shape === 'bean') {
      const pulse = Math.sin(time * 0.05 + this.x * 0.01 + this.y * 0.01);
      const rl = this.radius * 2 * (0.8 + 0.4 * pulse);
      const rw = this.radius * (0.8 + 0.2 * pulse);
      const angle = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, rl, rw, angle, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export default function NetParticleEngine({ config, backgroundColor }: NetParticleEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<NetNode[]>([]);
  const animationFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

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

    const mx = mouseRef.current.active ? mouseRef.current.x : (containerRef.current ? containerRef.current.clientWidth / 2 : 0);
    const my = mouseRef.current.active ? mouseRef.current.y : (containerRef.current ? containerRef.current.clientHeight / 2 : 0);

    const triggerWave = (color: string) => {
      particlesRef.current.forEach(p => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        p.targetColor = color;
        p.colorDelay = Math.max(0, dist * 0.2);
      });
    };

    if (config.colorMode === 'mixed') {
      particlesRef.current.forEach((p, i) => {
        p.targetColor = config.colors![i % config.colors!.length];
        p.colorDelay = Math.random() * 20;
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
        const area = width * height;
        const densityMultiplier = configRef.current.density ?? 1.0;
        const targetCount = Math.min(
          Math.floor(300 * densityMultiplier),
          Math.floor((area / 6000) * densityMultiplier)
        );

        const colors = configRef.current.colors;
        const colorMode = configRef.current.colorMode || 'wave';

        for (let i = 0; i < targetCount; i++) {
          const node = new NetNode(Math.random() * width, Math.random() * height);
          if (colors && colors.length > 0) {
            node.currentColor = colorMode === 'mixed' ? colors[i % colors.length] : colors[0];
          } else if (configRef.current.color) {
            node.currentColor = configRef.current.color;
          }
          particlesRef.current.push(node);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const ctx = canvas.getContext('2d')!;
    let time = 0;

    const render = () => {
      time += 1;
      const rect = container.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);
      if (backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      const mx = mouseRef.current.active ? mouseRef.current.x : null;
      const my = mouseRef.current.active ? mouseRef.current.y : null;

      const particles = particlesRef.current;
      const currentShape = configRef.current.shape || 'circle';
      const maxDist = 120;
      const maxDistSq = maxDist * maxDist;
      const particleSpeed = configRef.current.particleSpeed ?? 1.0;
      const trackingSpeed = configRef.current.pointerTrackingSpeed ?? 0.06;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(rect.width, rect.height, mx, my, particleSpeed, trackingSpeed);

        ctx.globalAlpha = 1.0;
        p1.draw(ctx, currentShape, time);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const alpha = 1 - Math.sqrt(distSq) / maxDist;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.currentColor;
            ctx.globalAlpha = alpha * 0.5;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;

      // Draw lines to mouse
      if (mx !== null && my !== null) {
        const mouseConnectionRadius = 150;
        const mouseConnectionRadiusSq = mouseConnectionRadius * mouseConnectionRadius;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mx;
          const dy = p.y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseConnectionRadiusSq) {
            const alpha = 1 - Math.sqrt(distSq) / mouseConnectionRadius;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = p.currentColor;
            ctx.globalAlpha = alpha * 0.8;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [backgroundColor, config.density]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
