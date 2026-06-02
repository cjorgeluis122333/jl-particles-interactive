import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function RepelMode() {
  return (
    <ParticleCanvas height="100%">
      <TextParticleEngine
        text="BOOM"
        clickMode="repel"
        particleColor="255, 140, 0"
      />
    </ParticleCanvas>
  );
}`;

interface Example04Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example04RepelMode({ isActive, isPaused, onActivate }: Example04Props) {
  return (
    <ExampleShell
      number={4}
      title="Modo Repulsión al Hacer Clic"
      description="Mantén presionado el botón del ratón para que las partículas se dispersen desde el cursor. Prueba hacer clic y arrastra."
      code={EXAMPLE_CODE}
      height="60vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%">
          <TextParticleEngine
            text="BOOM"
            clickMode="repel"
            particleColor="255, 140, 0"
          />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}

