import { RefObject } from 'react';
export type ClickMode = 'none' | 'attract' | 'repel';
export declare function useParticleInteraction(containerRef: RefObject<HTMLDivElement | null>): RefObject<{
    x: number;
    y: number;
    isDown: boolean;
    active: boolean;
}>;
export declare function getMagnetTarget(x: number, y: number, targetX: number, targetY: number, mx: number | null, my: number | null, isMouseDown: boolean, isMagnet: boolean, clickMode: ClickMode): {
    x: number;
    y: number;
};
