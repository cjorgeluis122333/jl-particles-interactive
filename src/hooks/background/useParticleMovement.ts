import { FollowPointerParticle } from '../../components/background/FollowPointerParticle';

export function useParticleMovement(
  particle: FollowPointerParticle,
  swarmX: number,
  swarmY: number,
  time: number
) {
  let anchorX = swarmX + particle.baseX;
  let anchorY = swarmY + particle.baseY;

  // Wandering
  anchorX += Math.sin(time * particle.randomSpeed + particle.baseY * 0.05) * 15 * particle.z;
  anchorY += Math.cos(time * particle.randomSpeed + particle.baseX * 0.05) * 15 * particle.z;

  const dxBase = anchorX - particle.x;
  const dyBase = anchorY - particle.y;

  // Spring back to floating anchor to maintain the cluster shape
  const forceX = dxBase * 0.06;
  const forceY = dyBase * 0.06;

  return { forceX, forceY };
}
