import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import CarouselExample from '../../../components/text-examples/CarouselExample';

const CODE_SNIPPET = `import { useState, useEffect } from 'react';
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
}`;

export default function CarouselPage() {
  return (
    <SectionWrapper
      id="carousel"
      title="Word Carousel"
      subtitle="Dynamically update particle text with timers for word transitions."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          Updating the <code className="text-violet-300 font-mono text-xs">text</code> prop causes particles to smoothly dissemble from the previous word and re-form into the new target positions with natural arc physics.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="300px">
            <CarouselExample />
          </LiveDemo>
        </div>

        {/* Code */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Code</h3>
          <CodeBlock code={CODE_SNIPPET} language="tsx" />
        </div>
      </div>
    </SectionWrapper>
  );
}
