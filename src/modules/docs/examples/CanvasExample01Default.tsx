import { ParticleCanvas } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas } from 'jl-particle-interactive';

export default function DefaultCanvas() {
  return (
    <ParticleCanvas height="100%" />
  );
}`;

interface CanvasExample01Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function CanvasExample01Default({ isActive, isPaused, onActivate }: CanvasExample01Props) {
  return (
    <ExampleShell
      number={1}
      title="Canvas por Defecto"
      description="El canvas en su estado base, sin texto. Las partículas flotan libremente y reaccionan al cursor. Ideal para usar como fondo animado."
      code={EXAMPLE_CODE}
      height="50vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%" />
      )}
    </ExampleShell>
  );
}
