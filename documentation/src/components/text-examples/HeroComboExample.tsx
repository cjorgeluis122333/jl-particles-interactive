import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['Build', 'Create', 'Ship'];

export default function HeroComboExample() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas
      height="320px"
      backgroundColor="#050505"
      background={{
        name: 'NET',
        density: 0.5,
        colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
        colorMode: 'mixed',
      }}
    >
      <TextParticleEngine
        text={words[index]}
        particleColor={['255, 255, 255']}
        particleDensity={0.5}
        particleSize={1.2}
        particleEase={1.3}
        isMagnet={true}
        particleShape="bean"
      />
    </ParticleCanvas>
  );
}
