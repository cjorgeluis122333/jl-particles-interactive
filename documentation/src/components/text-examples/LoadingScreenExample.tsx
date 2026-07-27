import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function LoadingScreenExample() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', background: '#050505' }}>
      <ParticleCanvas
        width="100%"
        height="100%"
        backgroundColor="#050505"
        style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
      >
        <TextParticleEngine
          text="Loading..."
          particleColor={['167, 139, 250', '96, 165, 250']}
          particleDensity={0.5}
          isMagnet={false}
        />
      </ParticleCanvas>
    </div>
  );
}
