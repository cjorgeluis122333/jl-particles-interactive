import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function NoMagnet() {
  return (
    <ParticleCanvas height="50vh">
      <TextParticleEngine
        text="Estático"
        isMagnet={false}
        particleColor="200, 200, 200"
      />
    </ParticleCanvas>
  );
}`;

export default function Example06NoMagnet() {
  return (
    <ExampleShell
      number={6}
      title="Sin Efecto Magnético"
      description="Desactiva el efecto hover del ratón. El texto permanece completamente estable sin interacción en movimiento."
      code={EXAMPLE_CODE}
      height="50vh"
    >
      <ParticleCanvas height="100%">
        <TextParticleEngine
          text="Estático"
          isMagnet={false}
          particleColor="200, 200, 200"
        />
      </ParticleCanvas>
    </ExampleShell>
  );
}
