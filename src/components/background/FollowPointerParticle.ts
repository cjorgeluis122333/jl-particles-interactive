import { useParticleMovement } from '../../hooks/background/useParticleMovement';
import { usePointerTracking } from '../../hooks/background/usePointerTracking';
import { useParticleScaling } from '../../hooks/background/useParticleScaling';
import { useParticleOrientation } from '../../hooks/background/useParticleOrientation';
import { ParticleOrientation } from '../../types/background';

export class FollowPointerParticle {
  x: number;
  y: number;
  baseX: number;  // Relative X to swarm center
  baseY: number;  // Relative Y to swarm center
  z: number;
  vx: number;
  vy: number;
  color: string;
  targetColor: string | null = null;
  colorDelay: number = 0;
  angleTarget: number;
  randomSpeed: number;
  sizeBias: number;
  scale: number;
  dirX: number;
  dirY: number;
  initialized: boolean = false;

  constructor(relX: number, relY: number, color: string) {
    this.x = relX;
    this.y = relY;
    this.baseX = relX;
    this.baseY = relY;
    this.z = Math.random() * 1.5 + 0.2;
    this.vx = 0;
    this.vy = 0;
    this.color = color;
    this.angleTarget = Math.random() * Math.PI * 2;
    this.randomSpeed = Math.random() * 2 + 1;
    this.sizeBias = Math.random();
    this.scale = 1.0;
    this.dirX = Math.cos(this.angleTarget);
    this.dirY = Math.sin(this.angleTarget);
  }

  update(
    mouseX: number | null,
    mouseY: number | null,
    swarmX: number,
    swarmY: number,
    screenW: number,
    screenH: number,
    time: number,
    orientation: ParticleOrientation = 'vertical'
  ) {
    if (!this.initialized) {
      this.x = swarmX + this.baseX;
      this.y = swarmY + this.baseY;
      this.initialized = true;
    }

    // 1. Pointer tracking logic
    const {
      forceX: pointerForceX,
      forceY: pointerForceY,
      dxCenter,
      dyCenter,
      distToCenter,
    } = usePointerTracking(this, mouseX, mouseY, swarmX, swarmY, time);

    // 2. Movement / wandering logic
    const {
      forceX: movementForceX,
      forceY: movementForceY,
    } = useParticleMovement(this, swarmX, swarmY, time);

    this.vx += pointerForceX + movementForceX;
    this.vy += pointerForceY + movementForceY;

    // Friction
    this.vx *= 0.75;
    this.vy *= 0.75;

    this.x += this.vx;
    this.y += this.vy;

    // 3. Dynamic size scaling
    useParticleScaling(this, distToCenter);

    // 4. Orientation (vertical / horizontal / diagonal)
    useParticleOrientation(this, dxCenter, dyCenter, distToCenter, orientation, time);

    // 5. Color transition
    if (this.targetColor) {
      this.colorDelay -= 1;
      if (this.colorDelay <= 0) {
        this.color = this.targetColor;
        this.targetColor = null;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, time: number, shape: 'circle' | 'square' | 'bean' = 'bean') {
    if (this.scale <= 0.05) return;

    ctx.fillStyle = this.color;

    // Outer particles fade out to blend into the background
    const distFromBase = Math.sqrt(this.baseX * this.baseX + this.baseY * this.baseY);
    const edgeFade = Math.max(0, 1 - distFromBase / 350);

    ctx.globalAlpha = Math.min(1, (0.5 + this.z * 0.5) * Math.min(this.scale, 1.0) * edgeFade);

    if (ctx.globalAlpha <= 0.01) return;

    if (shape === 'circle') {
      const r = Math.max(0.1, 2 * this.scale * this.z);
      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'square') {
      const r = Math.max(0.1, 2 * this.scale * this.z);
      ctx.fillRect(this.x - r, this.y - r, r * 2, r * 2);
    } else { // 'bean'
      const baseLength = 6 + this.sizeBias * 6;
      const maxLength = baseLength * this.scale;

      // Dynamic pulsation for the tips to shrink and expand
      const pulse = Math.sin(time * 3.5 + this.baseX * 0.1 + this.randomSpeed * 5);

      // Range goes from 0.4 (shrunk) to 1.0 (expanded to max length)
      const lengthMultiplier = 0.4 + 0.6 * ((pulse + 1) / 2);
      const dynamicRadiusX = (maxLength * 0.5) * lengthMultiplier;

      // Thickness (fluid droplets/ellipses)
      const dynamicRadiusY = Math.max(0.8, (this.z * 1.5 * this.scale) * (0.8 + 0.2 * pulse));

      const angle = Math.atan2(this.dirY, this.dirX);

      ctx.beginPath();
      ctx.ellipse(this.x, this.y, dynamicRadiusX, dynamicRadiusY, angle, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
