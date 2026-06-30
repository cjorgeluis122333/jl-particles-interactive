import { ParticleBackground } from 'jl-particle-interactive';
import SectionWrapper from '../components/SectionWrapper';
import CodeBlock from '../components/CodeBlock';
import PropTable from '../components/PropTable';
import LiveDemo from '../components/LiveDemo';

const BG_PROPS = [
  { prop: 'name', type: "'NONE' | 'FOLLOW_POINTER' | 'NET' | 'JELLYFISH'", description: 'Background engine to render. Required.' },
  { prop: 'config', type: 'BackgroundConfig', description: 'All engine options (see table below). Optional.' },
  { prop: 'width', type: 'string | number', default: "'100%'", description: 'Container width.' },
  { prop: 'height', type: 'string | number', default: "'60vh'", description: 'Container height.' },
  { prop: 'backgroundColor', type: 'string', default: "'#050505'", description: 'Background fill color.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class for the container div.' },
  { prop: 'style', type: 'CSSProperties', description: 'Inline style overrides merged over base container styles.' },
];

const CONFIG_PROPS = [
  { prop: 'density', type: 'number', description: 'Particle count multiplier. Base counts: FOLLOW_POINTER=350, NET≈300, JELLYFISH=350.' },
  { prop: 'color', type: 'string', description: 'Single hex color for all particles.' },
  { prop: 'colors', type: 'string[]', description: 'Palette of hex colors; overrides color.' },
  { prop: 'colorMode', type: "'wave' | 'mixed'", description: 'How colors propagate. wave = gradient across particles, mixed = random per particle.' },
  { prop: 'shape', type: "'circle' | 'square' | 'bean'", description: 'Particle drawing shape.' },
  { prop: 'particleSpeed', type: 'number', description: 'Animation speed multiplier.' },
  { prop: 'pointerTrackingSpeed', type: 'number', description: 'How fast particles follow the cursor. Lower = floatier (default ~0.06).' },
  { prop: 'orientation', type: "'vertical' | 'horizontal' | 'diagonal'", description: 'Swarm drift direction. FOLLOW_POINTER mode only.' },
];

const FOLLOW_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

export default function FollowPointerDemo() {
  return (
    <ParticleBackground
      name="FOLLOW_POINTER"
      height="60vh"
      backgroundColor="#050505"
      config={{
        orientation: 'diagonal',
        density: 1,
        shape: 'bean',
        colors: ['#00d4ff', '#6ee7b7', '#facc15'],
        colorMode: 'wave',
        pointerTrackingSpeed: 0.06,
      }}
    />
  );
}`;

const NET_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

export default function NetDemo() {
  return (
    <ParticleBackground
      name="NET"
      height="60vh"
      backgroundColor="#050505"
      config={{
        density: 0.9,
        shape: 'circle',
        colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
        colorMode: 'mixed',
        particleSpeed: 1,
      }}
    />
  );
}`;

const JELLYFISH_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

export default function JellyfishDemo() {
  return (
    <ParticleBackground
      name="JELLYFISH"
      height="60vh"
      backgroundColor="#050505"
      config={{
        density: 1.1,
        shape: 'circle',
        colors: ['#f472b6', '#a78bfa', '#22d3ee'],
        colorMode: 'wave',
        pointerTrackingSpeed: 0.02,
      }}
    />
  );
}`;

export default function BackgroundModesSection() {
  return (
    <SectionWrapper
      id="backgrounds"
      title="Background Modes"
      subtitle="ParticleBackground renders standalone animated backgrounds — no text particles needed."
    >
      <div className="space-y-12">
        {/* Overview */}
        <div className="-mt-4 space-y-4">
          <p className="text-sm text-white/55 leading-relaxed">
            Use <code className="text-violet-300 font-mono text-xs">{'<ParticleBackground>'}</code> when you want
            an animated background without text. Select the engine via the{' '}
            <code className="text-violet-300 font-mono text-xs">name</code> prop and pass all options through{' '}
            <code className="text-violet-300 font-mono text-xs">config</code>.
          </p>
          <p className="text-sm text-white/55 leading-relaxed">
            To combine a text engine with a background, use{' '}
            <code className="text-violet-300 font-mono text-xs">{'<ParticleCanvas background={{ name: ... }}>'}</code> instead (see{' '}
            <a href="#examples" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">Examples</a>).
          </p>
        </div>

        {/* ParticleBackground props */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">
            {'<ParticleBackground>'} props
          </h3>
          <PropTable rows={BG_PROPS} />
        </div>

        {/* Config options */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">BackgroundConfig options</h3>
          <p className="text-sm text-white/45 mb-4">
            All fields are optional. Pass any combination inside the{' '}
            <code className="text-violet-300 font-mono text-xs">config</code> prop.
          </p>
          <PropTable rows={CONFIG_PROPS} />
        </div>

        {/* FOLLOW_POINTER */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">FOLLOW_POINTER</h3>
          <p className="text-sm text-white/45 mb-4">
            Particles form a loose swarm that chases the cursor. The swarm drifts along the configured
            orientation between cursor interactions.
          </p>
          <CodeBlock code={FOLLOW_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleBackground
              name="FOLLOW_POINTER"
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
              config={{
                orientation: 'diagonal',
                density: 0.6,
                shape: 'bean',
                colors: ['#00d4ff', '#6ee7b7', '#facc15'],
                colorMode: 'wave',
                pointerTrackingSpeed: 0.06,
              }}
            />
          </LiveDemo>
        </div>

        {/* NET */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">NET</h3>
          <p className="text-sm text-white/45 mb-4">
            Nodes bounce around the canvas and draw lines between nearby pairs, creating a connected
            graph aesthetic. Great for tech-style hero sections.
          </p>
          <CodeBlock code={NET_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleBackground
              name="NET"
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
              config={{
                density: 0.7,
                shape: 'circle',
                colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
                colorMode: 'mixed',
                particleSpeed: 1,
              }}
            />
          </LiveDemo>
        </div>

        {/* JELLYFISH */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">JELLYFISH</h3>
          <p className="text-sm text-white/45 mb-4">
            Soft concentric rings expand and contract in a slow breathing cycle (1 s active, 3 s relaxation).
            Particles drift with organic float noise. Best with <code className="text-violet-300 font-mono text-xs">pointerTrackingSpeed</code> set low.
          </p>
          <CodeBlock code={JELLYFISH_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleBackground
              name="JELLYFISH"
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
              config={{
                density: 0.8,
                shape: 'circle',
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
