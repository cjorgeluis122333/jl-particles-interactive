import { ClickMode } from '../hooks/useParticleInteraction';
export declare class Particle {
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
    constructor(w: number, h: number, color?: string | string[]);
    update(time: number, isActive: boolean, mx?: number | null, my?: number | null, isMouseDown?: boolean, isMagnet?: boolean, clickMode?: ClickMode): void;
    draw(ctx: CanvasRenderingContext2D, shape?: 'circle' | 'square'): void;
}
