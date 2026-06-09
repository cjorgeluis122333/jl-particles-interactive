import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import './App.css';

const CAROUSEL_WORDS = ['Hello', 'React', 'Canvas', 'Magic'];

type DemoKey =
  | 'text-basic'
  | 'text-colors'
  | 'text-repel'
  | 'text-attract'
  | 'text-carousel'
  | 'bg-net'
  | 'bg-jellyfish'
  | 'bg-follow';

interface Demo {
  key: DemoKey;
  label: string;
  description: string;
  code: string;
}

const DEMOS: Demo[] = [
  {
    key: 'text-basic',
    label: 'Text Particles',
    description: 'Thousands of particles form letters using pixel-sampling with spatial coherence. Hover to see the magnetic attraction effect.',
    code: `<ParticleCanvas height="320px">
  <TextParticleEngine
    text="Hello"
    isMagnet={true}
  />
</ParticleCanvas>`,
  },
  {
    key: 'text-colors',
    label: 'Color Palette',
    description: 'Pass an array of hex colors — each particle picks one at random for a vibrant multicolor effect.',
    code: `<ParticleCanvas height="320px">
  <TextParticleEngine
    text="React"
    particleColor={['#ff6b6b', '#feca57', '#48dbfb', '#a29bfe']}
    particleSize={1.4}
  />
</ParticleCanvas>`,
  },
  {
    key: 'text-repel',
    label: 'Click: Repel',
    description: 'Hold the mouse button down — particles flee from the cursor. Release and they snap back to form the word.',
    code: `<ParticleCanvas height="320px">
  <TextParticleEngine
    text="Boom"
    clickMode="repel"
    particleEase={2}
  />
</ParticleCanvas>`,
  },
  {
    key: 'text-attract',
    label: 'Click: Attract',
    description: 'Hold the mouse button — particles swarm toward the cursor. Release and they reform the text.',
    code: `<ParticleCanvas height="320px">
  <TextParticleEngine
    text="Pull"
    clickMode="attract"
    isMagnet={false}
  />
</ParticleCanvas>`,
  },
  {
    key: 'text-carousel',
    label: 'Word Carousel',
    description: 'Change the text prop and particles smoothly re-form. Ideal for animated hero section headlines.',
    code: `const words = ['Hello', 'React', 'Canvas', 'Magic'];

const [index, setIndex] = useState(0);
useEffect(() => {
  const id = setInterval(
    () => setIndex(i => (i + 1) % words.length),
    2000
  );
  return () => clearInterval(id);
}, []);

<ParticleCanvas height="320px">
  <TextParticleEngine text={words[index]} />
</ParticleCanvas>`,
  },
  {
    key: 'bg-net',
    label: 'NET Background',
    description: 'Bouncing nodes connected by lines when close enough — a classic network particle graph that works behind any content.',
    code: `<ParticleCanvas
  height="320px"
  background={{
    name: 'NET',
    color: '#4ecdc4',
    lineDistance: 120,
    density: 0.8,
  }}
>
  <TextParticleEngine
    text="Network"
    particleColor="#ffffff"
  />
</ParticleCanvas>`,
  },
  {
    key: 'bg-jellyfish',
    label: 'JELLYFISH Background',
    description: 'Smooth organic glowing rings that drift and pulse — gives a bioluminescent, fluid background effect.',
    code: `<ParticleCanvas
  height="320px"
  background={{
    name: 'JELLYFISH',
    colors: ['#ff6b6b', '#a29bfe', '#00cec9'],
    colorMode: 'wave',
  }}
>
  <TextParticleEngine
    text="Fluid"
    particleColor="#ffffff"
  />
</ParticleCanvas>`,
  },
  {
    key: 'bg-follow',
    label: 'FOLLOW_POINTER Background',
    description: 'A swarm of depth-layered particles that follow the pointer. Move your cursor over the canvas.',
    code: `<ParticleCanvas
  height="320px"
  background={{
    name: 'FOLLOW_POINTER',
    colors: ['#6c5ce7', '#a29bfe', '#fd79a8'],
    colorMode: 'wave',
    density: 1.2,
  }}
>
  <TextParticleEngine
    text="Follow"
    particleColor="#ffffff"
  />
</ParticleCanvas>`,
  },
];

function DemoCanvas({ demoKey, carouselIndex }: { demoKey: DemoKey; carouselIndex: number }) {
  const words = CAROUSEL_WORDS;

  switch (demoKey) {
    case 'text-basic':
      return (
        <ParticleCanvas height="320px">
          <TextParticleEngine text="Hello" isMagnet={true} />
        </ParticleCanvas>
      );
    case 'text-colors':
      return (
        <ParticleCanvas height="320px">
          <TextParticleEngine
            text="React"
            particleColor={['#ff6b6b', '#feca57', '#48dbfb', '#a29bfe']}
            particleSize={1.4}
          />
        </ParticleCanvas>
      );
    case 'text-repel':
      return (
        <ParticleCanvas height="320px">
          <TextParticleEngine text="Boom" clickMode="repel" particleEase={2} />
        </ParticleCanvas>
      );
    case 'text-attract':
      return (
        <ParticleCanvas height="320px">
          <TextParticleEngine text="Pull" clickMode="attract" isMagnet={false} />
        </ParticleCanvas>
      );
    case 'text-carousel':
      return (
        <ParticleCanvas height="320px">
          <TextParticleEngine text={words[carouselIndex]} />
        </ParticleCanvas>
      );
    case 'bg-net':
      return (
        <ParticleCanvas
          height="320px"
          background={{ name: 'NET', color: '#4ecdc4', lineDistance: 120, density: 0.8 }}
        >
          <TextParticleEngine text="Network" particleColor="#ffffff" />
        </ParticleCanvas>
      );
    case 'bg-jellyfish':
      return (
        <ParticleCanvas
          height="320px"
          background={{ name: 'JELLYFISH', colors: ['#ff6b6b', '#a29bfe', '#00cec9'], colorMode: 'wave' }}
        >
          <TextParticleEngine text="Fluid" particleColor="#ffffff" />
        </ParticleCanvas>
      );
    case 'bg-follow':
      return (
        <ParticleCanvas
          height="320px"
          background={{
            name: 'FOLLOW_POINTER',
            colors: ['#6c5ce7', '#a29bfe', '#fd79a8'],
            colorMode: 'wave',
            density: 1.2,
          }}
        >
          <TextParticleEngine text="Follow" particleColor="#ffffff" />
        </ParticleCanvas>
      );
  }
}

export default function App() {
  const [activeDemo, setActiveDemo] = useState<DemoKey>('text-basic');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [codeVisible, setCodeVisible] = useState(false);

  useEffect(() => {
    if (activeDemo !== 'text-carousel') return;
    const id = setInterval(() => setCarouselIndex(i => (i + 1) % CAROUSEL_WORDS.length), 2000);
    return () => clearInterval(id);
  }, [activeDemo]);

  const current = DEMOS.find(d => d.key === activeDemo)!;

  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-title">
            <span className="header-pkg">jl-particle-interactive</span>
            <span className="header-version">v0.2.0</span>
          </div>
          <nav className="header-nav">
            <a href="https://www.npmjs.com/package/jl-particle-interactive" target="_blank" rel="noopener noreferrer">npm</a>
            <a href="https://github.com/cjorgeluis122333/jl-particles-interactive" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" aria-label="Hero demo">
        <ParticleCanvas
          height="420px"
          backgroundColor="#08080f"
          background={{ name: 'NET', color: '#3d3d6b', lineDistance: 100, density: 0.5 }}
        >
          <TextParticleEngine
            text="Particles"
            particleColor={['#a29bfe', '#6c5ce7', '#fd79a8', '#74b9ff']}
            particleSize={1.2}
            isMagnet={true}
            clickMode="repel"
          />
        </ParticleCanvas>
        <div className="hero-caption">
          <p>Canvas-based React library · Zero dependencies · TypeScript · React 18+</p>
          <div className="hero-cta">
            <code>npm install jl-particle-interactive</code>
          </div>
        </div>
      </section>

      {/* Demo section */}
      <main className="demos-section">
        <h1 className="demos-heading">Live demos</h1>
        <p className="demos-subheading">
          Click a demo to preview it. All examples use the same two components:
          {' '}<code>&lt;ParticleCanvas&gt;</code> and <code>&lt;TextParticleEngine&gt;</code>.
        </p>

        {/* Tab strip */}
        <div className="tab-strip" role="tablist">
          <div className="tab-group-label">Text effects</div>
          {DEMOS.filter(d => d.key.startsWith('text')).map(d => (
            <button
              key={d.key}
              role="tab"
              aria-selected={activeDemo === d.key}
              className={`tab-btn ${activeDemo === d.key ? 'active' : ''}`}
              onClick={() => setActiveDemo(d.key)}
            >
              {d.label}
            </button>
          ))}
          <div className="tab-group-label">Backgrounds</div>
          {DEMOS.filter(d => d.key.startsWith('bg')).map(d => (
            <button
              key={d.key}
              role="tab"
              aria-selected={activeDemo === d.key}
              className={`tab-btn ${activeDemo === d.key ? 'active' : ''}`}
              onClick={() => setActiveDemo(d.key)}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Canvas preview */}
        <div className="demo-canvas-wrap">
          <DemoCanvas demoKey={activeDemo} carouselIndex={carouselIndex} />
        </div>

        {/* Description + code */}
        <div className="demo-info">
          <h2 className="demo-title">{current.label}</h2>
          <p className="demo-description">{current.description}</p>
          <button className="code-toggle" onClick={() => setCodeVisible(v => !v)}>
            {codeVisible ? 'Hide code' : 'Show code'}
          </button>
          {codeVisible && <pre><code>{current.code}</code></pre>}
        </div>
      </main>

      {/* Features */}
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          {[
            { title: 'Spring physics', body: 'Each particle uses spring + friction + float-noise. Movement feels natural, never robotic.' },
            { title: 'Magnetic hover', body: '~173 px attraction radius. Particles curve toward the cursor as it approaches.' },
            { title: 'Click attract / repel', body: 'Hold to scatter or swarm particles. Release — they re-form the text instantly.' },
            { title: 'Pixel-sampled text', body: 'Letters are sampled from an offscreen canvas with spatial coherence. Shapes stay crisp at any font size.' },
            { title: 'Zero dependencies', body: 'Only react and react-dom are used, and those are peer deps — nothing is bundled.' },
            { title: 'DPR-aware', body: 'Canvas is scaled by devicePixelRatio. Sharp output on retina and HiDPI displays.' },
            { title: 'Three backgrounds', body: 'NET graph, JELLYFISH glow, and FOLLOW_POINTER swarm — ready to use out of the box.' },
            { title: 'Full TypeScript', body: 'Written in strict TypeScript. Declarations are included — no @types package needed.' },
          ].map(f => (
            <article key={f.title} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quick install */}
      <section className="install-section">
        <h2>Get started in 30 seconds</h2>
        <pre><code>{`npm install jl-particle-interactive

import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function Hero() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine
        text="Hello World"
        particleColor={['#a29bfe', '#fd79a8', '#74b9ff']}
        isMagnet={true}
        clickMode="repel"
      />
    </ParticleCanvas>
  );
}`}</code></pre>
        <div className="install-links">
          <a href="https://www.npmjs.com/package/jl-particle-interactive" target="_blank" rel="noopener noreferrer">View on npm →</a>
          <a href="https://github.com/cjorgeluis122333/jl-particles-interactive" target="_blank" rel="noopener noreferrer">View on GitHub →</a>
        </div>
      </section>

      <footer className="site-footer">
        <p>MIT License · <a href="https://github.com/cjorgeluis122333/jl-particles-interactive" target="_blank" rel="noopener noreferrer">github.com/cjorgeluis122333/jl-particles-interactive</a></p>
      </footer>
    </div>
  );
}
