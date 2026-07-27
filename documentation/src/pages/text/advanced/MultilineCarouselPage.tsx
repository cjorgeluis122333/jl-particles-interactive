import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import MultilineCarouselExample from '../../../components/text-examples/MultilineCarouselExample';

const CODE_SNIPPET = `import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const phrases = [
  ['HELLO', 'HOW ARE YOU'],
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
        particleDensity={0.8}
        particleEase={1.2}
        isMagnet={true}
        particleShape="circle"
      />
    </ParticleCanvas>
  );
}`;

export default function MultilineCarouselPage() {
  return (
    <SectionWrapper
      id="multiline-carousel"
      title="Multiline Quote Carousel"
      subtitle="Transition between multiline sentences with smooth, dynamic particle reallocation."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          This advanced example combines the multiline array support with a state timer to periodically transition between entire multi-line phrases. The text sampling engine handles different phrase lengths on the fly, dynamically scaling and centering each sentence as it forms.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="300px">
            <MultilineCarouselExample />
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
