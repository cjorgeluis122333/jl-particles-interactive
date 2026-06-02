import { useState, useMemo } from 'react';
import CanvasExample01Default from '../examples/canvas/CanvasExample01Default';

const canvasExampleComponents = [
  CanvasExample01Default,
];

export default function CanvasSamples() {
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [pausedExamples, setPausedExamples] = useState<Set<number>>(new Set());

  const renderExamples = useMemo(() => {
    return canvasExampleComponents.map((Component, index) => {
      const isActive = index === activeExampleIndex;
      const isPaused = pausedExamples.has(index);

      return {
        Component,
        index,
        isActive,
        isPaused,
        handleActivate: () => {
          if (isActive) {
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
            setActiveExampleIndex(index);
            setPausedExamples(new Set());
          }
        },
      };
    });
  }, [activeExampleIndex, pausedExamples]);

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-2">Canvas Samples</h2>
      <p className="text-white/60 text-lg mb-4">
        Ejemplos de canvas sin texto: partículas en estado libre, perfectas para usar como fondos animados.
        Próximamente se añadirán más variaciones.
      </p>

      {/* Info Panel */}
      <div className="mb-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-200 text-sm">
        <p>
          <strong>Modo Activo:</strong> Ejemplo #{(activeExampleIndex + 1).toString().padStart(2, '0')} •
          {pausedExamples.has(activeExampleIndex) ? (
            <span className="ml-2 text-yellow-300">⏸ Pausado</span>
          ) : (
            <span className="ml-2 text-green-300">▶ Ejecutándose</span>
          )}
        </p>
        <p className="text-xs text-white/50 mt-2">
          Más variaciones de canvas se añadirán en el futuro.
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
