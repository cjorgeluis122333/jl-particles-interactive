import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function HeroSection() {
  const [heroText, setHeroText] = useState('HERO');

  return (
    <div className="relative h-full w-full">
      <ParticleCanvas height="100%" style={{ borderRadius: 0 }}>
        <TextParticleEngine
          text={heroText || 'HERO'}
          particleColor={['255, 255, 255', '200, 200, 200', '150, 200, 255']}
          particleSize={1.3}
          particleDensity={1.2}
          particleEase={1.5}
          clickMode="repel"
        />
      </ParticleCanvas>

      <div className="absolute inset-x-0 top-0 p-3 bg-black/40 border-b border-white/10 pointer-events-none">
        <input
          type="text"
          value={heroText}
          onChange={(e) => setHeroText(e.target.value.toUpperCase())}
          maxLength={24}
          placeholder="Escribe texto..."
          className="pointer-events-auto w-full rounded bg-black/40 border border-white/15 px-3 py-2 text-white placeholder:text-white/35 focus:outline-none focus:border-white/40"
        />
      </div>
    </div>
  );
}`;

interface Example11Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example11HeroSection({ isActive, isPaused, onActivate }: Example11Props) {
  const [heroText, setHeroText] = useState('HERO');

  return (
    <ExampleShell
      number={11}
      title="Animación de Título Hero"
      description="Sección hero de página completa con texto grande, múltiples colores y efecto de repulsión al hacer clic."
      code={EXAMPLE_CODE}
      height="80vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <div className="relative h-full w-full">
          <ParticleCanvas height="100%" style={{ borderRadius: 0 }}>
            <TextParticleEngine
              text={heroText || 'HERO'}
              particleColor={['255, 255, 255', '200, 200, 200', '150, 200, 255']}
              particleSize={1.3}
              particleDensity={1.2}
              particleEase={1.5}
              clickMode="repel"
            />
          </ParticleCanvas>

          <div className="absolute inset-x-0 top-0 p-3 bg-black/40 border-b border-white/10 pointer-events-none">
            <input
              type="text"
              value={heroText}
              onChange={(e) => setHeroText(e.target.value.toUpperCase())}
              maxLength={24}
              placeholder="Escribe texto..."
              className="pointer-events-auto w-full rounded bg-black/40 border border-white/15 px-3 py-2 text-white placeholder:text-white/35 focus:outline-none focus:border-white/40"
            />
          </div>
        </div>
      )}
    </ExampleShell>
  );
}

