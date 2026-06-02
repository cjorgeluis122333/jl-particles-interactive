import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function CustomBackground() {
  const bg = '#0d1b2a'; // azul oscuro

  return (
    <ParticleCanvas height="100%" backgroundColor={bg}>
      <TextParticleEngine
        text="NITE"
        backgroundColor={bg}
        particleColor={['200, 220, 255', '150, 180, 255', '100, 140, 230']}
      />
    </ParticleCanvas>
  );
}`;

interface Example09Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example09CustomBackground({ isActive, isPaused, onActivate }: Example09Props) {
  const bg = '#0d1b2a';

  return (
    <ExampleShell
      number={9}
      title="Fondo Personalizado"
      description="Personaliza el color de fondo del canvas. Asegúrate de que sea igual en ParticleCanvas y TextParticleEngine."
      code={EXAMPLE_CODE}
      height="60vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%" backgroundColor={bg}>
          <TextParticleEngine
            text="NITE"
            backgroundColor={bg}
            particleColor={['200, 220, 255', '150, 180, 255', '100, 140, 230']}
          />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}
