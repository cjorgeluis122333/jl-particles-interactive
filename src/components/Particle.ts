import { useRef, useEffect } from 'react';
import { Landmark } from '@mediapipe/tasks-vision';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  baseColor: string;
  opacity: number;
  size: number;
  sizeMultiplier: number;
  friction: number;
  ease: number;
  floatSpeed: number;
  floatOffset: number;
  
  constructor(w: number, h: number, color: string | string[] = '255, 255, 255') {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.targetX = this.x;
    this.targetY = this.y;
    this.vx = 0;
    this.vy = 0;
    
    // Size variation
    this.size = Math.random() * 1.8 + 0.5;
    this.sizeMultiplier = 1;

    // Configurable base rgb color
    this.baseColor = Array.isArray(color) ? color[Math.floor(Math.random() * color.length)] : color;
    this.opacity = 0.4 + Math.random() * 0.6; // Slightly more variation
    
    // Physics properties
    this.friction = 0.82 + Math.random() * 0.1;
    this.ease = 0.04 + Math.random() * 0.08;
    
    // Levitation properties
    this.floatSpeed = Math.random() * 0.02 + 0.005;
    this.floatOffset = Math.random() * Math.PI * 2;
  }

  update(time: number, isActive: boolean) {
    // Easing towards the target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    
    // Add some random organic movement when idle
    const noiseX = isActive ? 0 : Math.cos(time * 0.01 + this.y * 0.01) * 0.5;
    const noiseY = isActive ? 0 : Math.sin(time * 0.01 + this.x * 0.01) * 0.5;
    
    this.vx += (dx * this.ease) + noiseX;
    this.vy += (dy * this.ease) + noiseY;

    // Apply friction to slow down
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    this.x += this.vx;
    this.y += this.vy;

    // Levitation/wobble effect
    const amplitude = isActive ? 0.2 : 2.0;
    this.x += Math.cos(time * this.floatSpeed + this.floatOffset) * amplitude;
    this.y += Math.sin(time * this.floatSpeed + this.floatOffset) * amplitude;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    ctx.beginPath();
    // Use sizeMultiplier but clamp the minimum visual size a bit if needed, or simply multiply
    ctx.arc(this.x, this.y, Math.max(0.1, this.size * this.sizeMultiplier), 0, Math.PI * 2);
    ctx.fill();
  }
}
