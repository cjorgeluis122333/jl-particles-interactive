import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import ExampleShell from './_ExampleShell';

const WORDS = ['CREA', 'CODE', 'UX', 'FX', 'WEB'];
const COLORS = [
  ['255, 100, 100', '255, 160, 100'],
  ['100, 200, 255', '80, 140, 255'],
  ['150, 255, 150', '80, 210, 120'],
  ['255, 220, 80', '255, 160, 50'],
  ['200, 100, 255', '150, 80, 255'],
];

const EXAMPLE_CODE = `import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const WORDS = ['CREA', 'CODE', 'UX', 'FX', 'WEB'];
const COLORS = [
  ['255, 100, 100', '255, 160, 100'],
  ['100, 200, 255', '80, 140, 255'],
  ['150, 255, 150', '80, 210, 120'],
  ['255, 220, 80', '255, 160, 50'],
  ['200, 100, 255', '150, 80, 255'],
];

export default function WordCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="100%">
      <TextParticleEngine
        text={WORDS[index]}
        particleColor={COLORS[index]}
        particleEase={1.8}
        particleDensity={1.2}
        clickMode="repel"
      />
    </ParticleCanvas>
  );
}`;

interface Example15Props {
  isActive: boolean;
  isPaused: boolean;
  onActivate: () => void;
}
export default function Example15WordCarousel({ isActive, isPaused, onActivate }: Example15Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <ExampleShell
      number={15}
      title="Carrusel de Palabras"
      description="Rota palabras automáticamente cada 2.5 segundos con colores dinámicos y efecto de repulsión interactivo."
      code={EXAMPLE_CODE}
      height="60vh"
      isActive={isActive}
      isPaused={isPaused}
      onActivate={onActivate}
    >
      {isActive && (
      <ParticleCanvas height="100%">
        <TextParticleEngine
          text={WORDS[index]}
          particleColor={COLORS[index]}
          particleEase={1.8}
          particleDensity={1.2}
          clickMode="repel"
        />
      </ParticleCanvas>
      )}
    </ExampleShell>
  );
}
