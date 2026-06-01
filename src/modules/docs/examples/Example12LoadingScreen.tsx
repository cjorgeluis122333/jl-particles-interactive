import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const EXAMPLE_CODE = `import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParticleCanvas height="100vh">
      <TextParticleEngine
        text={loaded ? '' : '...'}
        particleColor="80, 180, 255"
        particleEase={2}
        isMagnet={false}
      />
    </ParticleCanvas>
  );
}`;

export default function Example12LoadingScreen() {
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
    >
      <div className="h-full flex flex-col">
        <div style={{ flex: 1 }} className="relative">
          <ParticleCanvas height="100%">
            <TextParticleEngine
              text={loaded ? '' : '...'}
              particleColor="80, 180, 255"
              particleEase={2}
              isMagnet={false}
            />
          </ParticleCanvas>
        </div>
        {showReset && (
          <div className="px-6 py-4 border-t border-white/10 bg-black/30">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors"
            >
              Reiniciar
            </button>
          </div>
        )}
      </div>
    </ExampleShell>
  );
}
