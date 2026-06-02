import { useState, useMemo } from 'react';
import Example01BasicText from '../examples/Example01BasicText';
import Example02DynamicText from '../examples/Example02DynamicText';
import Example03ColorPalette from '../examples/Example03ColorPalette';
import Example04RepelMode from '../examples/Example04RepelMode';
import Example05AttractMode from '../examples/Example05AttractMode';
import Example06NoMagnet from '../examples/Example06NoMagnet';
import Example07SquareParticles from '../examples/Example07SquareParticles';
import Example08DenseParticles from '../examples/Example08DenseParticles';
import Example09CustomBackground from '../examples/Example09CustomBackground';
import Example10FixedCanvas from '../examples/Example10FixedCanvas';
import Example11HeroSection from '../examples/Example11HeroSection';
import Example12LoadingScreen from '../examples/Example12LoadingScreen';
import Example13AnimatedCounter from '../examples/Example13AnimatedCounter';
import Example14InteractiveModeSelector from '../examples/Example14InteractiveModeSelector';
import Example15WordCarousel from '../examples/Example15WordCarousel';
import Example16AdaptiveText from '../examples/Example16AdaptiveText';

const exampleComponents = [
  Example01BasicText,
  Example02DynamicText,
  Example03ColorPalette,
  Example04RepelMode,
  Example05AttractMode,
  Example06NoMagnet,
  Example07SquareParticles,
  Example08DenseParticles,
  Example09CustomBackground,
  Example10FixedCanvas,
  Example11HeroSection,
  Example12LoadingScreen,
  Example13AnimatedCounter,
  Example14InteractiveModeSelector,
  Example15WordCarousel,
  Example16AdaptiveText,
];

export default function Examples() {
  // Por defecto, el ejemplo #1 es el activo
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [pausedExamples, setPausedExamples] = useState<Set<number>>(new Set());

  // Memoizar la lista de componentes con props dinámicas
  const renderExamples = useMemo(() => {
    return exampleComponents.map((Component, index) => {
      const isActive = index === activeExampleIndex;
      const isPaused = pausedExamples.has(index);

      return {
        Component,
        index,
        isActive,
        isPaused,
        handleActivate: () => {
          if (isActive) {
            // Si ya está activo, toggle pause/resume
            setPausedExamples((prev) => {
              const newSet = new Set(prev);
              if (newSet.has(index)) {
                newSet.delete(index);
              } else {
                newSet.add(index);
              }
              return newSet;
            });
          } else {
            // Activar este ejemplo y pausar los demás
            setActiveExampleIndex(index);
            setPausedExamples(new Set()); // Reanudar el nuevo activo
          }
        },
      };
    });
  }, [activeExampleIndex, pausedExamples]);

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-2">Ejemplos Interactivos</h2>
      <p className="text-white/60 text-lg mb-4">
        Explora 15 ejemplos prácticos que muestran todas las capacidades de la librería jl-particle-interactive.
        Solo se ejecuta un ejemplo a la vez para optimizar el rendimiento.
      </p>

      {/* Info Panel */}
      <div className="mb-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-200 text-sm">
        <p>
          <strong>Modo Activo:</strong> Ejemplo #{(activeExampleIndex + 1).toString().padStart(2, '0')} •
          {pausedExamples.has(activeExampleIndex) ? (
            <span className="ml-2 text-yellow-300">⏸ Pausado</span>
          ) : (
            <span className="ml-2 text-green-300">▶ Ejecutándose</span>
          )}
        </p>
        <p className="text-xs text-white/50 mt-2">
          Haz clic en "Ejecutar" en cualquier ejemplo para activarlo. Los demás se pausarán automáticamente.
        </p>
      </div>

      {/* Galería de ejemplos */}
      <div className="grid grid-cols-1 gap-6">
        {renderExamples.map(({ Component, index, isActive, isPaused, handleActivate }) => (
          <div key={index}>
            <Component
              isActive={isActive}
              isPaused={isPaused}
              onActivate={handleActivate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
