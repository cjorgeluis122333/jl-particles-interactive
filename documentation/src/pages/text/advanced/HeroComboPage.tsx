import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import HeroComboExample from '../../../components/text-examples/HeroComboExample';

const CODE_SNIPPET = `import { useState, useEffect } from 'react';
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
}`;

export default function HeroComboPage() {
  return (
    <SectionWrapper
      id="hero-combo"
      title="Text + Background Combination"
      subtitle="Combine TextParticleEngine with a particle background inside a single ParticleCanvas."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          By passing the <code className="text-violet-300 font-mono text-xs">background</code> prop to{' '}
          <code className="text-violet-300 font-mono text-xs">ParticleCanvas</code>, you can mount a background engine (such as <code className="text-violet-300 font-mono text-xs">"NET"</code>) alongside <code className="text-violet-300 font-mono text-xs">TextParticleEngine</code>.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="320px">
            <HeroComboExample />
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
