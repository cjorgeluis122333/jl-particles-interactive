import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function BasicExample() {
  return (
    <ParticleCanvas height="50vh">
      <TextParticleEngine text="Hola Mundo" />
    </ParticleCanvas>
  );
}`;

export default function Example01BasicText() {
  return (
    <ExampleShell
      number={1}
      title="Texto Estático"
      description="El caso más simple. Las partículas forman el texto al cargar y permanecen interactivas al pasar el cursor."
      code={EXAMPLE_CODE}
      height="50vh"
    >
      <ParticleCanvas height="100%">
        <TextParticleEngine text="Hola Mundo" />
      </ParticleCanvas>
    </ExampleShell>
  );
}
