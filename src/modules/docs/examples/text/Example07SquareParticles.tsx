import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function SquareParticles() {
  return (
    <ParticleCanvas height="100%" backgroundColor="#0a0a0a">
      <TextParticleEngine
        text="8BIT"
        particleShape="square"
        particleSize={1.5}
        particleColor="0, 255, 100"
        backgroundColor="#0a0a0a"
      />
    </ParticleCanvas>
  );
}`;

interface Example07Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example07SquareParticles({ isActive, isPaused, onActivate }: Example07Props) {
  return (
    <ExampleShell
      number={7}
      title="Partículas Cuadradas"
      description="Usa particleShape='square' para un estilo pixelado tipo retro. Perfecto para temática vintage o gaming."
      code={EXAMPLE_CODE}
      height="55vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%" backgroundColor="#0a0a0a">
          <TextParticleEngine
            text="8BIT"
            particleShape="square"
            particleSize={1.5}
            particleColor="0, 255, 100"
            backgroundColor="#0a0a0a"
          />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}

