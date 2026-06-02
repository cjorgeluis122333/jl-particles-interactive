import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['RX', 'VITE', 'TS', 'FX'];

export default function DynamicText() {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative h-full w-full">
      <ParticleCanvas height="100%">
        <TextParticleEngine text={words[index]} />
      </ParticleCanvas>

      <div className="absolute inset-x-0 bottom-0 p-4 bg-black/40 border-t border-white/10 pointer-events-none">
        <button
          onClick={() => setIndex((i) => (i + 1) % words.length)}
          className="pointer-events-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
        >
          Siguiente palabra: {words[index]}
        </button>
      </div>
    </div>
  );
}`;

const words = ['RX', 'VITE', 'TS', 'FX'];

interface Example02Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example02DynamicText({ isActive, isPaused, onActivate }: Example02Props) {
  const [index, setIndex] = useState(0);

  return (
    <ExampleShell
      number={2}
      title="Cambio Dinámico de Texto"
      description="Las partículas se redistribuyen fluidamente cuando el texto cambia. Haz clic en el botón para cambiar la palabra."
      code={EXAMPLE_CODE}
      height="50vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <div className="relative h-full w-full">
          <ParticleCanvas height="100%">
            <TextParticleEngine text={words[index]} />
          </ParticleCanvas>

          <div className="absolute inset-x-0 bottom-0 p-4 bg-black/40 border-t border-white/10 pointer-events-none">
            <button
              onClick={() => setIndex((i) => (i + 1) % words.length)}
              className="pointer-events-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
            >
              Siguiente palabra: {words[index]}
            </button>
          </div>
        </div>
      )}
    </ExampleShell>
  );
}

