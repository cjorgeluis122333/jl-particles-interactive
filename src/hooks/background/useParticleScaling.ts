import { FollowPointerParticle } from '../../components/background/FollowPointerParticle';

export function useParticleScaling(
  particle: FollowPointerParticle,
  distToCenter: number
) {
  // Dynamic Scaling based on proximity
  const maxDistForScaling = 400; // max visible radius of the cluster
  const normDist = Math.min(distToCenter / maxDistForScaling, 1.0);

  // Closer = smaller, farther = larger.
  let targetScale = (normDist * 2.5) + (particle.sizeBias * 1.0);

  // Very close = disappear completely
  if (targetScale < 0.4) {
    targetScale = 0;
  }

  // Smooth scaling
  particle.scale += (targetScale - particle.scale) * 0.15;
}
