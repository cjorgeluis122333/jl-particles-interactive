import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import SectionWrapper from '../components/SectionWrapper';
import CodeBlock from '../components/CodeBlock';
import PropTable from '../components/PropTable';
import LiveDemo from '../components/LiveDemo';

const PROPS = [
  { prop: 'text', type: 'string', description: "Text to form. Pass '' (empty string) to scatter particles freely as ambient float." },
  { prop: 'particleColor', type: "string | string[]", default: "'255, 255, 255'", description: "RGB string(s) in '`R, G, B`' format. Array: each particle picks a random color from the list." },
  { prop: 'particleSize', type: 'number', default: '1', description: 'Size multiplier. 0.5 = small dots, 2 = large blobs.' },
  { prop: 'particleDensity', type: 'number', default: '1', description: 'Count multiplier. Base: 3000 desktop / 1500 mobile. 0.5 = half, 2 = double.' },
  { prop: 'particleEase', type: 'number', default: '1', description: 'Spring speed toward target. Higher = snappier, lower = floatier.' },
  { prop: 'isMagnet', type: 'boolean', default: 'true', description: 'Enable hover magnetic attraction (~173px radius spring force).' },
  { prop: 'clickMode', type: "'none' | 'attract' | 'repel'", default: "'none'", description: "Click behavior: attract swarms particles, repel pushes them outward." },
  { prop: 'particleShape', type: "'circle' | 'square' | 'bean'", default: "'circle'", description: 'Particle drawing shape. Bean is an oriented elongated oval.' },
  { prop: 'backgroundColor', type: 'string', default: "'#050505'", description: "Hex background for trail-fade effect. Pass 'transparent' to disable fading." },
];

const FREE_FLOAT_CODE = `<ParticleCanvas height="60vh" backgroundColor="#050505">
  <TextParticleEngine
    text=""
    particleColor={['60, 165, 250', '167, 139, 250', '52, 211, 153']}
    particleSize={1.2}
    isMagnet={true}
  />
</ParticleCanvas>`;

const HELLO_CODE = `<ParticleCanvas height="60vh" backgroundColor="#050505">
  <TextParticleEngine
    text="Hello 🖐️"
    particleColor={['244, 114, 182', '251, 146, 60', '250, 204, 21', '52, 211, 153', '96, 165, 250']}
    particleSize={1.3}
    particleEase={1.2}
    isMagnet={true}
    clickMode="repel"
    particleShape="circle"
  />
</ParticleCanvas>`;

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

export default function TextParticlesSection() {
  return (
    <SectionWrapper
      id="text-particles"
      title="Text Particles"
      subtitle="TextParticleEngine converts any string into animated particles that form letter shapes."
    >
      <div className="space-y-12">
        {/* Overview */}
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          The engine uses an offscreen canvas to pixel-sample the text, then assigns each sampled pixel as a
          spring-target for a particle. Particles travel to their targets using spring physics with friction and
          idle float-noise. Passing <code className="text-violet-300 font-mono text-xs">text=""</code> (empty string)
          scatters particles freely — useful for ambient background effects.
        </p>

        {/* Props */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">Props</h3>
          <PropTable rows={PROPS} />
          <p className="mt-3 text-xs text-white/35">
            ⚠ <code className="font-mono">particleColor</code> values must be in{' '}
            <code className="font-mono">'R, G, B'</code> format (integers 0–255), <strong>not</strong> hex.
          </p>
        </div>

        {/* Example 1: Free-floating */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Free-floating ambient</h3>
          <p className="text-sm text-white/45 mb-4">
            Pass <code className="text-violet-300 font-mono text-xs">text=""</code> to scatter particles freely.
            Great for loading screens or decorative backgrounds.
          </p>
          <CodeBlock code={FREE_FLOAT_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
            >
              <TextParticleEngine
                text=""
                particleColor={['60, 165, 250', '167, 139, 250', '52, 211, 153']}
                particleSize={1.2}
                isMagnet={true}
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>

        {/* Example 2: Hello repel */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Magnetic hover + repel</h3>
          <p className="text-sm text-white/45 mb-4">
            Particles spring toward the cursor on hover. Click to repel them outward.
          </p>
          <CodeBlock code={HELLO_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
            >
              <TextParticleEngine
                text="Hello 🖐️"
                particleColor={['244, 114, 182', '251, 146, 60', '250, 204, 21', '52, 211, 153', '96, 165, 250']}
                particleSize={1.3}
                particleEase={1.2}
                isMagnet={true}
                clickMode="repel"
                particleShape="circle"
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>

        {/* Example 3: Word carousel */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Word carousel</h3>
          <p className="text-sm text-white/45 mb-4">
            Change the <code className="text-violet-300 font-mono text-xs">text</code> prop and particles
            automatically re-form. No extra animation code needed — it's driven by React state.
          </p>
          <CodeBlock code={CAROUSEL_CODE} language="tsx" />
          <LiveDemo height="240px">
            <CarouselDemo />
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  );
}
