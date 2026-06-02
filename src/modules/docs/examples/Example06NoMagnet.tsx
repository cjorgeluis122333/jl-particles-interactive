import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function NoMagnet() {
  return (
    <ParticleCanvas height="100%">
      <TextParticleEngine
        text="FIX"
        isMagnet={false}
        particleColor="200, 200, 200"
      />
    </ParticleCanvas>
  );
}`;

interface Example06Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example06NoMagnet({ isActive, isPaused, onActivate }: Example06Props) {
  return (
    <ExampleShell
      number={6}
      title="Sin Efecto Magnético"
      description="Desactiva el efecto hover del ratón. El texto permanece completamente estable sin interacción en movimiento."
      code={EXAMPLE_CODE}
      height="50vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%">
          <TextParticleEngine
            text="FIX"
            isMagnet={false}
            particleColor="200, 200, 200"
          />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}
