import { useRef, useEffect, RefObject } from 'react';

export type ClickMode = 'none' | 'attract' | 'repel';

export function useParticleInteraction(containerRef: RefObject<HTMLDivElement | null>) {
    const mouseRef = useRef({ x: -1000, y: -1000, isDown: false, active: false });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handlePointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            mouseRef.current.active = true;
        };
        const handlePointerLeave = () => { mouseRef.current.active = false; };
        const handlePointerDown = () => { mouseRef.current.isDown = true; };
        const handlePointerUp = () => { mouseRef.current.isDown = false; };

        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerleave', handlePointerLeave);
        container.addEventListener('pointerdown', handlePointerDown);
        container.addEventListener('pointerup', handlePointerUp);
        container.style.touchAction = 'none';

        return () => {
            container.removeEventListener('pointermove', handlePointerMove);
            container.removeEventListener('pointerleave', handlePointerLeave);
            container.removeEventListener('pointerdown', handlePointerDown);
            container.removeEventListener('pointerup', handlePointerUp);
        };
    }, [containerRef]);

    return mouseRef;
}

export function getMagnetTarget(
  x: number, y: number, targetX: number, targetY: number,
  mx: number | null, my: number | null, isMouseDown: boolean, isMagnet: boolean, clickMode: ClickMode
) {
  if (mx === null || my === null || (!isMagnet && clickMode === 'none')) {
      return { x: targetX, y: targetY };
  }

  let currentTargetX = targetX;
  let currentTargetY = targetY;

  const gdx = mx - x;
  const gdy = my - y;
  const distSq = gdx * gdx + gdy * gdy;
  const distance = Math.sqrt(distSq);

  // 1. Mouse hover effect (Magnet)
  if (isMagnet && !isMouseDown) {
    const maxDistanceHover = 30000;
    if (distSq < maxDistanceHover) {
       const force = (maxDistanceHover - distSq) / maxDistanceHover;
       currentTargetX += gdx * force * 0.15;
       currentTargetY += gdy * force * 0.15;
    }
  }

  // 2. Click effect
  if (isMouseDown && clickMode !== 'none') {
      if (clickMode === 'attract') {
          const maxDistance = 30000;
          if (distSq < maxDistance) {
            const force = (maxDistance - distSq) / maxDistance;
            currentTargetX += gdx * force * 0.8;
            currentTargetY += gdy * force * 0.8;
          }
      } else if (clickMode === 'repel') {
          const maxDistance = 50000;
          if (distSq < maxDistance && distance > 0) {
            const force = Math.pow(Math.max(0, maxDistance - distSq) / maxDistance, 1.2);
            currentTargetX -= (gdx / distance) * force * 400; 
            currentTargetY -= (gdy / distance) * force * 400;
          }
      }
  }

  return { x: currentTargetX, y: currentTargetY };
}
