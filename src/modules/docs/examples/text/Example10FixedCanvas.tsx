import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function FixedCanvas() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <ParticleCanvas width={600} height={300}>
        <TextParticleEngine
          text="600"
          particleColor="255, 200, 0"
          isMagnet={true}
        />
      </ParticleCanvas>
    </div>
  );
}`;

interface Example10Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example10FixedCanvas({ isActive, isPaused, onActivate }: Example10Props) {
  return (
    <ExampleShell
      number={10}
      title="Canvas de Tamaño Fijo"
      description="Dimensiones exactas (600×300) útiles para tarjetas o componentes con tamaño predefinido."
      code={EXAMPLE_CODE}
      height="40vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <div className="h-full w-full flex items-center justify-center">
          <ParticleCanvas width={600} height={300}>
            <TextParticleEngine
              text="600"
              particleColor="255, 200, 0"
              isMagnet={true}
            />
          </ParticleCanvas>
        </div>
      )}
    </ExampleShell>
  );
}

