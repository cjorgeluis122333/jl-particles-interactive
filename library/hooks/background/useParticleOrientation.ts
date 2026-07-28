import { FollowPointerParticle } from '../../components/background/FollowPointerParticle';
import { ParticleOrientation } from '../../types/background';

export function useParticleOrientation(
  particle: FollowPointerParticle,
  dxCenter: number,
  dyCenter: number,
  distToCenter: number,
  orientation: ParticleOrientation,
  time: number
) {
  let targetDirX = 0;
  let targetDirY = 0;

  if (orientation === 'horizontal') {
    targetDirX = 1;
    targetDirY = 0;
  } else if (orientation === 'diagonal') {
    // "diagonal" -> radial / pointing towards the center
    targetDirX = -dxCenter / distToCenter;
    targetDirY = -dyCenter / distToCenter;
  } else {
    // "vertical" -> current look (tangential/concentric)
    targetDirX = -dyCenter / distToCenter;
    targetDirY = dxCenter / distToCenter;
  }

  // Calculate the base angle of the target direction
  const baseAngle = Math.atan2(targetDirY, targetDirX);

  // Determine if this specific particle is allowed to wobble based on an innate random trait
  const canWobble = particle.sizeBias > 0.3 ? 1 : 0;

  // Create a time envelope so the particle doesn't wobble constantly (active only occasionally)
  const wobbleEnvelope = Math.max(0, Math.sin(time * 0.5 + particle.randomSpeed * 10));

  // Add a slight oscillating inclination (wobble) based on time and the particle's innate traits
  const angleWobble = Math.sin(time * 3.0 + particle.baseX * 0.1 + particle.randomSpeed) * 0.5 * wobbleEnvelope * canWobble;

  targetDirX = Math.cos(baseAngle + angleWobble);
  targetDirY = Math.sin(baseAngle + angleWobble);

  // Blend to target direction based on how close they are
  const blend = Math.max(1 - (distToCenter / 400), 0.1);

  if (orientation === 'horizontal') {
    particle.dirX = particle.dirX * (1 - 0.2) + targetDirX * 0.2;
    particle.dirY = particle.dirY * (1 - 0.2) + targetDirY * 0.2;
  } else {
    particle.dirX = particle.dirX * (1 - blend * 0.3) + targetDirX * blend * 0.3;
    particle.dirY = particle.dirY * (1 - blend * 0.3) + targetDirY * blend * 0.3;
  }

  const len = Math.sqrt(particle.dirX * particle.dirX + particle.dirY * particle.dirY);
  if (len > 0) {
    particle.dirX /= len;
    particle.dirY /= len;
  }
}
