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
];

export default function Examples() {
  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-2">Ejemplos Interactivos</h2>
      <p className="text-white/60 text-lg mb-8">
        Explora 15 ejemplos prácticos que muestran todas las capacidades de la librería jl-particle-interactive.
        Haz clic en los componentes para interactuar y abre el código para ver la implementación.
      </p>

      {/* Galería de ejemplos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exampleComponents.map((Component, index) => (
          <div key={index}>
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
}
