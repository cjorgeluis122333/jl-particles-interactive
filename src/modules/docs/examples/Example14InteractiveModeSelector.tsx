import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import type { ClickMode } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const modes: ClickMode[] = ['none', 'attract', 'repel'];

const EXAMPLE_CODE = `import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import type { ClickMode } from 'jl-particle-interactive';

const modes: ClickMode[] = ['none', 'attract', 'repel'];

export default function InteractiveModeSelector() {
  const [mode, setMode] = useState<ClickMode>('none');
  const [magnet, setMagnet] = useState(true);

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{ fontWeight: mode === m ? 'bold' : 'normal' }}
          >
            Clic: {m}
          </button>
        ))}
        <button onClick={() => setMagnet((v) => !v)}>
          Magneto: {magnet ? 'ON' : 'OFF'}
        </button>
      </div>

      <ParticleCanvas height="55vh">
        <TextParticleEngine
          text="DEMO"
          clickMode={mode}
          isMagnet={magnet}
          particleColor="180, 255, 180"
          particleSize={1.2}
        />
      </ParticleCanvas>
    </div>
  );
}`;

export default function Example14InteractiveModeSelector() {
  const [mode, setMode] = useState<ClickMode>('none');
  const [magnet, setMagnet] = useState(true);

  return (
    <ExampleShell
      number={14}
      title="Selector de Modo Interactivo"
      description="Permite cambiar en tiempo real el modo de interacción (click) y el efecto magnético (hover)."
      code={EXAMPLE_CODE}
      height="55vh"
    >
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b border-white/10 bg-black/30 flex gap-2 flex-wrap">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                mode === m
                  ? 'bg-green-600 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Clic: {m}
            </button>
          ))}
          <button
            onClick={() => setMagnet((v) => !v)}
            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
              magnet
                ? 'bg-blue-600 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Magneto: {magnet ? 'ON' : 'OFF'}
          </button>
        </div>
        <div style={{ flex: 1 }} className="relative">
          <ParticleCanvas height="100%">
            <TextParticleEngine
              text="DEMO"
              clickMode={mode}
              isMagnet={magnet}
              particleColor="180, 255, 180"
              particleSize={1.2}
            />
          </ParticleCanvas>
        </div>
      </div>
    </ExampleShell>
  );
}
