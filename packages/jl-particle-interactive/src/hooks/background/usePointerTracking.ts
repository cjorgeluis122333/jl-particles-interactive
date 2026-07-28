import { FollowPointerParticle } from '../../components/background/FollowPointerParticle';

export function usePointerTracking(
  particle: FollowPointerParticle,
  mouseX: number | null,
  mouseY: number | null,
  swarmX: number,
  swarmY: number,
  time: number
) {
  // Target center reacts slower because we use the swarm coordinates
  // which are interpolated smoothly towards the mouse position
  const targetCenterX = swarmX;
  const targetCenterY = swarmY;

  // Distance to pointer center
  const dxCenter = particle.x - targetCenterX;
  const dyCenter = particle.y - targetCenterY;
  const distToCenter = Math.max(Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter), 1);

  let forceX = 0;
  let forceY = 0;

  // Gentle radial wave to make it look like it's breathing around the pointer
  const wave = Math.sin(distToCenter * 0.02 - time * 3.0);
  const waveForce = (wave * 2.5) * particle.z;
  forceX += (dxCenter / distToCenter) * waveForce;
  forceY += (dyCenter / distToCenter) * waveForce;

  // Lateral/sway motion to avoid purely back-and-forth movement
  const swayWave = Math.cos(distToCenter * 0.01 - time * 1.0 + particle.randomSpeed);
  const swayForce = (swayWave * 0.8) * particle.z;
  const tangentX = -dyCenter / distToCenter;
  const tangentY = dxCenter / distToCenter;
  forceX += tangentX * swayForce;
  forceY += tangentY * swayForce;

  return { forceX, forceY, dxCenter, dyCenter, distToCenter };
}
