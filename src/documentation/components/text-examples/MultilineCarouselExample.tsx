import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const phrases = [
  ['HELLO','HOW ARE YOU'],
  ['I HOPPE', 'THIS LIBRARY CAN', 'HELP YOU'],
  ['THE ONLY LIMIT', 'IS', 'YOUR IMAGUINATION']
];

export default function MultilineCarouselExample() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text={phrases[index]}
        particleColor={['96, 165, 250', '167, 139, 250', '244, 114, 182']}
        particleDensity={1.1}
        particleEase={1.2}
        isMagnet={true}
        particleShape="circle"
      />
    </ParticleCanvas>
  );
}
