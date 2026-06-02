import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function DenseParticles() {
  return (
    <ParticleCanvas height="100%">
      <TextParticleEngine
        text="HD"
        particleDensity={2}
        particleSize={0.6}
        particleEase={2}
        particleColor="255, 255, 255"
      />
    </ParticleCanvas>
  );
}`;

interface Example08Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example08DenseParticles({ isActive, isPaused, onActivate }: Example08Props) {
  return (
    <ExampleShell
      number={8}
      title="Alta Densidad y Tamaño Grande"
      description="Multiplicadores de densidad y tamaño. El doble de partículas con velocidad de retorno más rápida."
      code={EXAMPLE_CODE}
      height="70vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%">
          <TextParticleEngine
            text="HD"
            particleDensity={2}
            particleSize={0.6}
            particleEase={2}
            particleColor="255, 255, 255"
          />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}

