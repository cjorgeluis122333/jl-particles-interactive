import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function FixedCanvas() {
  return (
    <ParticleCanvas width={600} height={300} style={{ margin: '0 auto' }}>
      <TextParticleEngine
        text="600×300"
        particleColor="255, 200, 0"
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}`;

export default function Example10FixedCanvas() {
  return (
    <ExampleShell
      number={10}
      title="Canvas de Tamaño Fijo"
      description="Dimensiones exactas (600×300) útiles para tarjetas o componentes con tamaño predefinido."
      code={EXAMPLE_CODE}
      height="40vh"
    >
      <div className="h-full flex items-center justify-center bg-black/30">
        <ParticleCanvas width={600} height={300}>
          <TextParticleEngine
            text="600×300"
            particleColor="255, 200, 0"
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>
    </ExampleShell>
  );
}
