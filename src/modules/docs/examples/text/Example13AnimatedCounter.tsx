import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AnimatedCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c < 9 ? c + 1 : 0)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ParticleCanvas width={300} height={300}>
        <TextParticleEngine
          text={String(count)}
          particleColor="255, 180, 50"
          particleEase={3}
          particleDensity={1.5}
          isMagnet={false}
          backgroundColor="#050505"
        />
      </ParticleCanvas>
    </div>
  );
}`;

interface Example13Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}
export default function Example13AnimatedCounter({ isActive, isPaused, onActivate }: Example13Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c < 9 ? c + 1 : 0)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <ExampleShell
      number={13}
      title="Contador Animado"
      description="Las partículas se reorganizan cada vez que cambia el número (0-9). Se reinicia después de 9."
      code={EXAMPLE_CODE}
      height="40vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <div className="h-full w-full flex items-center justify-center">
          <ParticleCanvas width={300} height={300}>
            <TextParticleEngine
              text={String(count)}
              particleColor="255, 180, 50"
              particleEase={3}
              particleDensity={1.5}
              isMagnet={false}
              backgroundColor="#050505"
            />
          </ParticleCanvas>
        </div>
      )}
    </ExampleShell>
  );
}

