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
    <div className="relative h-full w-full">
      <ParticleCanvas height="100%">
        <TextParticleEngine
          text="DEMO"
          clickMode={mode}
          isMagnet={magnet}
          particleColor="180, 255, 180"
          particleSize={1.2}
        />
      </ParticleCanvas>

      <div className="absolute inset-x-0 top-0 p-4 bg-black/40 border-b border-white/10 flex gap-2 flex-wrap pointer-events-none">
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={\`pointer-events-auto px-3 py-2 rounded text-sm font-medium transition-colors \${
              mode === m
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }\`}
          >
            Clic: {m}
          </button>
        ))}
        <button
          onClick={() => setMagnet((v) => !v)}
          className={\`pointer-events-auto px-3 py-2 rounded text-sm font-medium transition-colors \${
            magnet
              ? 'bg-blue-600 text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }\`}
        >
          Magneto: {magnet ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
}`;

interface Example14Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}
export default function Example14InteractiveModeSelector({ isActive, isPaused, onActivate }: Example14Props) {
  const [mode, setMode] = useState<ClickMode>('none');
  const [magnet, setMagnet] = useState(true);

  return (
    <ExampleShell
      number={14}
      title="Selector de Modo Interactivo"
      description="Permite cambiar en tiempo real el modo de interacción (click) y el efecto magnético (hover)."
      code={EXAMPLE_CODE}
      height="55vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <div className="relative h-full w-full">
          <ParticleCanvas height="100%">
            <TextParticleEngine
              text="DEMO"
              clickMode={mode}
              isMagnet={magnet}
              particleColor="180, 255, 180"
              particleSize={1.2}
            />
          </ParticleCanvas>

          <div className="absolute inset-x-0 top-0 p-4 bg-black/40 border-b border-white/10 flex gap-2 flex-wrap pointer-events-none">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`pointer-events-auto px-3 py-2 rounded text-sm font-medium transition-colors ${
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
              className={`pointer-events-auto px-3 py-2 rounded text-sm font-medium transition-colors ${
                magnet
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Magneto: {magnet ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}
    </ExampleShell>
  );
}
