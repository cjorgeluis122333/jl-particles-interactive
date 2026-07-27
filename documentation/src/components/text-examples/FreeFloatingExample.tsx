import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function FreeFloatingExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text=""
        particleColor={['60, 165, 250', '167, 139, 250', '52, 211, 153']}
        particleSize={1.2}
        particleDensity={0.5}
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}
