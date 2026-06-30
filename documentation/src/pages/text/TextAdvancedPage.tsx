import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import SectionWrapper from '../../components/SectionWrapper';
import CodeBlock from '../../components/CodeBlock';
import LiveDemo from '../../components/LiveDemo';

const CAROUSEL_CODE = `import { useEffect, useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['Create', 'Inspire', 'React'];

export default function WordCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="60vh" backgroundColor="#050505">
      <TextParticleEngine
        text={words[index]}
        particleColor={['96, 165, 250', '167, 139, 250', '244, 114, 182']}
        particleSize={1.5}
        particleEase={1.2}
        isMagnet={true}
        particleShape="bean"
      />
    </ParticleCanvas>
  );
}`;

const HERO_CODE = `import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['Build', 'Create', 'Ship'];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas
      height="60vh"
      backgroundColor="#050505"
      background={{
        name: 'NET',
        density: 0.7,
        colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
        colorMode: 'mixed',
      }}
    >
      <TextParticleEngine
        text={words[index]}
        particleColor={['255, 255, 255']}
        particleSize={1.8}
        particleEase={1.3}
        isMagnet={true}
        particleShape="bean"
      />
    </ParticleCanvas>
  );
}`;

const LOADING_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function LoadingScreen() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#050505' }}>
      <ParticleCanvas
        width="100%"
        height="100%"
        backgroundColor="#050505"
        style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
      >
        <TextParticleEngine
          text="Loading..."
          particleColor={['167, 139, 250', '96, 165, 250']}
          particleSize={1}
          particleDensity={0.8}
          isMagnet={false}
          particleShape="circle"
        />
      </ParticleCanvas>
    </div>
  );
}`;

const CAROUSEL_WORDS = ['Create', 'Inspire', 'React', 'Build'];

function CarouselDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % CAROUSEL_WORDS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas
      width="100%"
      height="100%"
      backgroundColor="#050505"
      style={{ borderRadius: 0 }}
    >
      <TextParticleEngine
        text={CAROUSEL_WORDS[index]}
        particleColor={['96, 165, 250', '167, 139, 250', '244, 114, 182']}
        particleSize={1.5}
        particleEase={1.2}
        isMagnet={true}
        particleShape="bean"
      />
    </ParticleCanvas>
  );
}

const HERO_WORDS = ['Build', 'Create', 'Ship'];

function HeroDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % HERO_WORDS.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas
      width="100%"
      height="100%"
      backgroundColor="#050505"
      style={{ borderRadius: 0 }}
      background={{
        name: 'NET',
        density: 0.55,
        colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
        colorMode: 'mixed',
      }}
    >
      <TextParticleEngine
        text={HERO_WORDS[index]}
        particleColor={['255, 255, 255']}
        particleSize={1.8}
        particleEase={1.3}
        isMagnet={true}
        particleShape="bean"
      />
    </ParticleCanvas>
  );
}

export default function TextAdvancedPage() {
  return (
    <SectionWrapper
      id="text-advanced"
      title="Text Particles — Advanced"
      subtitle="Word carousels, text + background combinations, and production patterns."
    >
      <div className="space-y-12">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          Advanced patterns combine <code className="text-violet-300 font-mono text-xs">TextParticleEngine</code> with
          React state, timers, and background engines. Change the{' '}
          <code className="text-violet-300 font-mono text-xs">text</code> prop and particles automatically re-form —
          no extra animation code needed.
        </p>

        {/* Word carousel */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Word carousel</h3>
          <p className="text-sm text-white/45 mb-4">
            Use <code className="text-violet-300 font-mono text-xs">setInterval</code> to cycle through words.
            Particles re-form smoothly on each change with an arc impulse for natural transitions.
          </p>
          <CodeBlock code={CAROUSEL_CODE} language="tsx" />
          <LiveDemo height="240px">
            <CarouselDemo />
          </LiveDemo>
        </div>

        {/* Text + background combo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Text + background combination</h3>
          <p className="text-sm text-white/45 mb-4">
            Combine <code className="text-violet-300 font-mono text-xs">TextParticleEngine</code> with a{' '}
            <code className="text-violet-300 font-mono text-xs">background</code> prop on{' '}
            <code className="text-violet-300 font-mono text-xs">ParticleCanvas</code>. Both engines run simultaneously.
          </p>
          <CodeBlock code={HERO_CODE} language="tsx" />
          <LiveDemo height="260px">
            <HeroDemo />
          </LiveDemo>
        </div>

        {/* Loading screen */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Loading screen</h3>
          <p className="text-sm text-white/45 mb-4">
            Override default border-radius and shadows with{' '}
            <code className="text-violet-300 font-mono text-xs">style</code> to make the canvas fill a fixed overlay.
            Disable <code className="text-violet-300 font-mono text-xs">isMagnet</code> for a non-interactive loading state.
          </p>
          <CodeBlock code={LOADING_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
            >
              <TextParticleEngine
                text="Loading..."
                particleColor={['167, 139, 250', '96, 165, 250']}
                particleSize={1}
                particleDensity={0.8}
                isMagnet={false}
                particleShape="circle"
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  );
}
