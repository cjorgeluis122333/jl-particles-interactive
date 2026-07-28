import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['Create', 'Inspire', 'React', 'Build'];

export default function CarouselExample() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text={words[index]}
        particleColor={['96, 165, 250', '167, 139, 250', '244, 114, 182']}
        particleDensity={0.5}
        particleEase={1.2}
        isMagnet={true}
        particleShape="bean"
      />
    </ParticleCanvas>
  );
}
