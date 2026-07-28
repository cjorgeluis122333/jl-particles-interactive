import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function ShapesExample() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2 text-center">Circle</p>
        <ParticleCanvas height="180px" backgroundColor="#050505">
          <TextParticleEngine
            text="Circle"
            particleColor={['167, 139, 250', '96, 165, 250']}
            particleDensity={0.3}
            particleShape="circle"
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>

      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2 text-center">Square</p>
        <ParticleCanvas height="180px" backgroundColor="#050505">
          <TextParticleEngine
            text="Square"
            particleColor={['167, 139, 250', '96, 165, 250']}
            particleDensity={0.3}
            particleShape="square"
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>

      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2 text-center">Bean</p>
        <ParticleCanvas height="180px" backgroundColor="#050505">
          <TextParticleEngine
            text="Bean"
            particleColor={['167, 139, 250', '96, 165, 250']}
            particleDensity={0.3}
            particleShape="bean"
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>
    </div>
  );
}
