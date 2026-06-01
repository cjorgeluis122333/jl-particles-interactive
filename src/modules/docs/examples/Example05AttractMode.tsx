import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AttractMode() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine
        text="Imán"
        clickMode="attract"
        isMagnet={false}
        particleColor="80, 220, 200"
      />
    </ParticleCanvas>
  );
}`;

export default function Example05AttractMode() {
  return (
    <ExampleShell
      number={5}
      title="Modo Atracción al Hacer Clic"
      description="Mantén pulsado para que las partículas sean atraídas fuertemente hacia el cursor. El efecto es opuesto a la repulsión."
      code={EXAMPLE_CODE}
      height="60vh"
    >
      <ParticleCanvas height="100%">
        <TextParticleEngine
          text="Imán"
          clickMode="attract"
          isMagnet={false}
          particleColor="80, 220, 200"
        />
      </ParticleCanvas>
    </ExampleShell>
  );
}
