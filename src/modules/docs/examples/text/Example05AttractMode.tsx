import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AttractMode() {
  return (
    <ParticleCanvas height="100%">
      <TextParticleEngine
        text="IMAN"
        clickMode="attract"
        isMagnet={false}
        particleColor="80, 220, 200"
      />
    </ParticleCanvas>
  );
}`;

interface Example05Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}

export default function Example05AttractMode({ isActive, isPaused, onActivate }: Example05Props) {
  return (
    <ExampleShell
      number={5}
      title="Modo Atracción al Hacer Clic"
      description="Mantén pulsado para que las partículas sean atraídas fuertemente hacia el cursor. El efecto es opuesto a la repulsión."
      code={EXAMPLE_CODE}
      height="60vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <ParticleCanvas height="100%">
          <TextParticleEngine
            text="IMAN"
            clickMode="attract"
            isMagnet={false}
            particleColor="80, 220, 200"
          />
        </ParticleCanvas>
      )}
    </ExampleShell>
  );
}

