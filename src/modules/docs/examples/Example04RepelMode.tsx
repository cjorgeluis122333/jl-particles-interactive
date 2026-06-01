import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function RepelMode() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine
        text="¡Explota!"
        clickMode="repel"
        particleColor="255, 140, 0"
      />
    </ParticleCanvas>
  );
}`;

export default function Example04RepelMode() {
  return (
    <ExampleShell
      number={4}
      title="Modo Repulsión al Hacer Clic"
      description="Mantén presionado el botón del ratón para que las partículas se dispersen desde el cursor. Prueba hacer clic y arrastra."
      code={EXAMPLE_CODE}
      height="60vh"
    >
      <ParticleCanvas height="100%">
        <TextParticleEngine
          text="¡Explota!"
          clickMode="repel"
          particleColor="255, 140, 0"
        />
      </ParticleCanvas>
    </ExampleShell>
  );
}
