import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AttractExample() {
  return (
    <ParticleCanvas height="280px" backgroundColor="#050505">
      <TextParticleEngine
        text="Click me"
        particleColor={['250, 204, 21', '251, 146, 60', '244, 114, 182']}
        particleDensity={0.5}
        particleEase={0.8}
        isMagnet={true}
        clickMode="attract"
      />
    </ParticleCanvas>
  );
}
