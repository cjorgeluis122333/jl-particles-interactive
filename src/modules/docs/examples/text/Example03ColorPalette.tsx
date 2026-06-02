import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function ColorPalette() {
  return (
    <ParticleCanvas height="100%">
      <TextParticleEngine
        text="RGB"
        particleColor={[
          '255, 100, 100',   // rojo
          '100, 200, 255',   // azul claro
          '150, 255, 150',   // verde
          '255, 220, 80',    // amarillo
          '200, 100, 255',   // violeta
        ]}
      />
    </ParticleCanvas>
  );
}`;

interface Example03Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example03ColorPalette({ isActive, isPaused, onActivate }: Example03Props) {
  return (
    <ExampleShell
      number={3}
      title="Paleta de Colores"
      description="Cada partícula elige un color al azar de una paleta predefinida. Crea un efecto visual más dinámico y colorido."
      code={EXAMPLE_CODE}
      height="60vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%">
          <TextParticleEngine
            text="RGB"
            particleColor={[
              '255, 100, 100',
              '100, 200, 255',
              '150, 255, 150',
              '255, 220, 80',
              '200, 100, 255',
            ]}
          />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}

