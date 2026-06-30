import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine, ParticleBackground } from 'jl-particle-interactive';
import SectionWrapper from '../components/SectionWrapper';
import CodeBlock from '../components/CodeBlock';
import LiveDemo from '../components/LiveDemo';

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

const JELLYFISH_FULL_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

export default function AnimatedPage() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Full-screen JELLYFISH background */}
      <ParticleBackground
        name="JELLYFISH"
        width="100%"
        height="100vh"
        backgroundColor="#020208"
        style={{ borderRadius: 0, border: 'none', boxShadow: 'none', position: 'fixed', inset: 0 }}
        config={{
          density: 1.2,
          colors: ['#f472b6', '#a78bfa', '#22d3ee'],
          colorMode: 'wave',
          pointerTrackingSpeed: 0.02,
        }}
      />

      {/* Page content renders on top */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1>Your content here</h1>
      </div>
    </div>
  );
}`;

const ATTRACT_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AttractDemo() {
  return (
    <ParticleCanvas height="60vh" backgroundColor="#050505">
      <TextParticleEngine
        text="Click me"
        particleColor={['250, 204, 21', '251, 146, 60', '244, 114, 182']}
        particleSize={1.2}
        particleEase={0.8}
        isMagnet={true}
        clickMode="attract"
        particleShape="circle"
      />
    </ParticleCanvas>
  );
}`;

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

export default function ExamplesSection() {
  return (
    <SectionWrapper
      id="examples"
      title="Examples"
      subtitle="Copy-paste ready recipes for common use cases."
    >
      <div className="space-y-14">

        {/* Hero with NET background */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Hero section with word carousel + NET background</h3>
          <p className="text-sm text-white/45 mb-4">
            Combine <code className="text-violet-300 font-mono text-xs">TextParticleEngine</code> with a{' '}
            <code className="text-violet-300 font-mono text-xs">background</code> prop on{' '}
            <code className="text-violet-300 font-mono text-xs">ParticleCanvas</code>. Both run simultaneously.
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

        {/* Click attract */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Click attract</h3>
          <p className="text-sm text-white/45 mb-4">
            Set <code className="text-violet-300 font-mono text-xs">clickMode="attract"</code> to swarm particles
            toward the cursor on click. Combine with <code className="text-violet-300 font-mono text-xs">isMagnet</code> for dual interaction.
          </p>
          <CodeBlock code={ATTRACT_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
            >
              <TextParticleEngine
                text="Click me"
                particleColor={['250, 204, 21', '251, 146, 60', '244, 114, 182']}
                particleSize={1.2}
                particleEase={0.8}
                isMagnet={true}
                clickMode="attract"
                particleShape="circle"
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>

        {/* Full-page JELLYFISH background */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Full-screen JELLYFISH background</h3>
          <p className="text-sm text-white/45 mb-4">
            Use <code className="text-violet-300 font-mono text-xs">position: fixed</code> with{' '}
            <code className="text-violet-300 font-mono text-xs">inset: 0</code> to cover the entire viewport behind
            your page content.
          </p>
          <CodeBlock code={JELLYFISH_FULL_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleBackground
              name="JELLYFISH"
              width="100%"
              height="100%"
              backgroundColor="#020208"
              style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
              config={{
                density: 0.7,
                colors: ['#f472b6', '#a78bfa', '#22d3ee'],
                colorMode: 'wave',
                pointerTrackingSpeed: 0.02,
              }}
            />
          </LiveDemo>
        </div>

      </div>
    </SectionWrapper>
  );
}
