import { ClickMode, getMagnetTarget } from '../../hooks/useParticleInteraction';
import { ParticleShape } from '../../types';

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
  easeMultiplier: number;
  floatSpeed: number;
  floatOffset: number;
  randomSpeed: number;

  constructor(w: number, h: number, color: string | string[] = '255, 255, 255') {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.targetX = this.x;
    this.targetY = this.y;
    this.vx = 0;
    this.vy = 0;

    this.size = Math.random() * 1.8 + 0.5;
    this.sizeMultiplier = 1;

    this.baseColor = Array.isArray(color)
      ? color[Math.floor(Math.random() * color.length)]
      : color;
    this.opacity = 0.4 + Math.random() * 0.6;

    this.friction = 0.82 + Math.random() * 0.1;
    this.ease = 0.03 + Math.random() * 0.05;
    this.easeMultiplier = 1;

    this.floatSpeed = Math.random() * 0.02 + 0.005;
    this.floatOffset = Math.random() * Math.PI * 2;
    this.randomSpeed = Math.random();
  }

  update(
    time: number,
    isActive: boolean,
    mx: number | null = null,
    my: number | null = null,
    isMouseDown: boolean = false,
    isMagnet: boolean = true,
    clickMode: ClickMode = 'none'
  ) {
    const { x: currentTargetX, y: currentTargetY } = getMagnetTarget(
      this.x, this.y, this.targetX, this.targetY, mx, my, isMouseDown, isMagnet, clickMode
    );

    const dx = currentTargetX - this.x;
    const dy = currentTargetY - this.y;

    const noiseX = isActive ? 0 : Math.cos(time * 0.01 + this.y * 0.01) * 0.5;
    const noiseY = isActive ? 0 : Math.sin(time * 0.01 + this.x * 0.01) * 0.5;

    this.vx += (dx * (this.ease * this.easeMultiplier)) + noiseX;
    this.vy += (dy * (this.ease * this.easeMultiplier)) + noiseY;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    const amplitude = isActive ? 0.2 : 2.0;
    this.x += Math.cos(time * this.floatSpeed + this.floatOffset) * amplitude;
    this.y += Math.sin(time * this.floatSpeed + this.floatOffset) * amplitude;
  }

  draw(ctx: CanvasRenderingContext2D, shape: ParticleShape = 'circle', time: number = 0) {
    ctx.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    const r = Math.max(0.1, this.size * this.sizeMultiplier);

    if (shape === 'square') {
      ctx.fillRect(this.x - r, this.y - r, r * 2, r * 2);
    } else if (shape === 'bean') {
      const maxLength = 6 + this.size * 2 * this.sizeMultiplier;
      const pulse = Math.sin(time * 0.05 + this.x * 0.01 + this.randomSpeed * 5);
      const lengthMultiplier = 0.4 + 0.6 * ((pulse + 1) / 2);
      const dynamicRadiusX = (maxLength * 0.5) * lengthMultiplier;
      const dynamicRadiusY = Math.max(0.8, (r * 1.5) * (0.8 + 0.2 * pulse));
      const angle = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, dynamicRadiusX, dynamicRadiusY, angle, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
