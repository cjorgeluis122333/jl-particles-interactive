import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function DenseParticles() {
  return (
    <ParticleCanvas height="70vh">
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

export default function Example08DenseParticles() {
  return (
    <ExampleShell
      number={8}
      title="Alta Densidad y Tamaño Grande"
      description="Multiplicadores de densidad y tamaño. El doble de partículas con velocidad de retorno más rápida."
      code={EXAMPLE_CODE}
      height="70vh"
    >
      <ParticleCanvas height="100%">
        <TextParticleEngine
          text="HD"
          particleDensity={2}
          particleSize={0.6}
          particleEase={2}
          particleColor="255, 255, 255"
        />
      </ParticleCanvas>
    </ExampleShell>
  );
}
