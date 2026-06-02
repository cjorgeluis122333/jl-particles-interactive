import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function BasicExample() {
  return (
    <ParticleCanvas height="100%">
      <TextParticleEngine text="HOLA" />
    </ParticleCanvas>
  );
}`;

interface Example01Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example01BasicText({ isActive, isPaused, onActivate }: Example01Props) {
  return (
    <ExampleShell
      number={1}
      title="Texto Estático"
      description="El caso más simple. Las partículas forman el texto al cargar y permanecen interactivas al pasar el cursor."
      code={EXAMPLE_CODE}
      height="50vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%">
          <TextParticleEngine text="HOLA" />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}
