import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function MultilineTextExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text={['Multi-line', 'Text', 'Support']}
        particleColor={['#60a5fa', '#34d399', '#f472b6']}
        particleDensity={0.8}
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}
