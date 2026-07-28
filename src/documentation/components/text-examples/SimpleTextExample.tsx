import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function SimpleTextExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text="Hello"
        particleColor="255, 255, 255"
        particleDensity={0.5}
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}
