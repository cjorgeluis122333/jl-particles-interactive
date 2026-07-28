import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function RepelExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text="Hello"
        particleColor={['244, 114, 182', '251, 146, 60', '250, 204, 21', '52, 211, 153', '96, 165, 250']}
        particleDensity={0.5}
        particleEase={1.2}
        isMagnet={true}
        clickMode="repel"
      />
    </ParticleCanvas>
  );
}
