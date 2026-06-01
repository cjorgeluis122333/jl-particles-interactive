import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['React', 'Vite', 'TypeScript', 'Canvas'];

export default function DynamicText() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <ParticleCanvas height="50vh">
        <TextParticleEngine text={words[index]} />
      </ParticleCanvas>

      <button onClick={() => setIndex((i) => (i + 1) % words.length)}>
        Siguiente palabra
      </button>
    </div>
  );
}`;

const words = ['React', 'Vite', 'TypeScript', 'Canvas'];

export default function Example02DynamicText() {
  const [index, setIndex] = useState(0);

  return (
    <ExampleShell
      number={2}
      title="Cambio Dinámico de Texto"
      description="Las partículas se redistribuyen fluidamente cuando el texto cambia. Haz clic en el botón para cambiar la palabra."
      code={EXAMPLE_CODE}
      height="50vh"
    >
      <div className="h-full flex flex-col">
        <div style={{ flex: 1 }} className="relative">
          <ParticleCanvas height="100%">
            <TextParticleEngine text={words[index]} />
          </ParticleCanvas>
        </div>
        <div className="px-6 py-4 border-t border-white/10 bg-black/30">
          <button
            onClick={() => setIndex((i) => (i + 1) % words.length)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
          >
            Siguiente palabra: {words[index]}
          </button>
        </div>
      </div>
    </ExampleShell>
  );
}
