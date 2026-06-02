import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from '../_ExampleShell';

const EXAMPLE_CODE = `import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      setShowReset(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    setLoaded(false);
    setShowReset(false);
  };

  return (
    <div className="relative h-full w-full">
      <ParticleCanvas height="100%">
        <TextParticleEngine
          text={loaded ? '' : '...'}
          particleColor="80, 180, 255"
          particleEase={2}
          isMagnet={false}
        />
      </ParticleCanvas>

      {showReset && (
        <div className="absolute inset-x-0 bottom-0 p-4 bg-black/40 border-t border-white/10 pointer-events-none">
          <button
            onClick={handleReset}
            className="pointer-events-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
          >
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}`;

interface Example12Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}
export default function Example12LoadingScreen({ isActive, isPaused, onActivate }: Example12Props) {
  const [loaded, setLoaded] = useState(false);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
      setShowReset(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    setLoaded(false);
    setShowReset(false);
  };

  return (
    <ExampleShell
      number={12}
      title="Pantalla de Carga con Partículas"
      description="Las partículas se dispersan cuando la carga termina (después de 3 segundos). Simula un efecto 'dissolve'."
      code={EXAMPLE_CODE}
      height="60vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
        <div className="relative h-full w-full">
          <ParticleCanvas height="100%">
            <TextParticleEngine
              text={loaded ? '' : '...'}
              particleColor="80, 180, 255"
              particleEase={2}
              isMagnet={false}
            />
          </ParticleCanvas>

          {showReset && (
            <div className="absolute inset-x-0 bottom-0 p-4 bg-black/40 border-t border-white/10 pointer-events-none">
              <button
                onClick={handleReset}
                className="pointer-events-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
              >
                Reiniciar
              </button>
            </div>
          )}
        </div>
      )}
    </ExampleShell>
  );
}

