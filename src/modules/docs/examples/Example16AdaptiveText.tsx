import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AdaptiveText() {
  const [text, setText] = useState('PARTICLE');

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div className="rounded-lg bg-black/40 border border-white/15 p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          maxLength={24}
          placeholder="Escribe texto..."
          className="w-full rounded bg-black/40 border border-white/15 px-3 py-2 text-white placeholder:text-white/35 focus:outline-none focus:border-white/40"
        />
      </div>
      <div className="flex-1">
        <ParticleCanvas height="100%" backgroundColor="#050505" style={{ borderRadius: 0 }}>
          <TextParticleEngine
            text={text || 'PARTICLE'}
            particleColor="255, 255, 255"
            particleDensity={0.9}
            particleSize={1}
            particleEase={1.1}
            isMagnet={true}
            clickMode="none"
            backgroundColor="#050505"
          />
        </ParticleCanvas>
      </div>
    </div>
  );
}`;

interface Example16Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example16AdaptiveText({ isActive, isPaused, onActivate }: Example16Props) {
  const [text, setText] = useState('PARTICLE');

  return (
    <ExampleShell
      number={16}
      title="Texto Adaptativo"
      description="El tamaño de las partículas se adapta automáticamente al contenedor según la longitud del texto. Escribe más caracteres para verlo en acción."
      code={EXAMPLE_CODE}
      height="36vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <div className="flex flex-col gap-4 h-full w-full">
          <div className="rounded-lg bg-black/40 border border-white/15 p-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              maxLength={24}
              placeholder="Escribe texto..."
              className="w-full rounded bg-black/40 border border-white/15 px-3 py-2 text-white placeholder:text-white/35 focus:outline-none focus:border-white/40"
            />
          </div>
          <div className="flex-1">
            <ParticleCanvas height="100%" backgroundColor="#050505" style={{ borderRadius: 0 }}>
              <TextParticleEngine
                text={text || 'PARTICLE'}
                particleColor="255, 255, 255"
                particleDensity={0.9}
                particleSize={1}
                particleEase={1.1}
                isMagnet={true}
                clickMode="none"
                backgroundColor="#050505"
              />
            </ParticleCanvas>
          </div>
        </div>
      )}
    </ExampleShell>
  );
}
