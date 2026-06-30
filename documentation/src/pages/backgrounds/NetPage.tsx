import { ParticleBackground } from 'jl-particle-interactive';
import CodeBlock from '../../components/CodeBlock';
import PropTable from '../../components/PropTable';

const CONFIG_PROPS = [
  { prop: 'density', type: 'number', default: '1', description: 'Particle count multiplier. Base count: min(300, width×height/6000).' },
  { prop: 'color', type: 'string', description: 'Single hex color for nodes and lines.' },
  { prop: 'colors', type: 'string[]', description: 'Palette of hex colors; overrides color.' },
  { prop: 'colorMode', type: "'wave' | 'mixed'", default: "'mixed'", description: 'wave = gradient across nodes, mixed = random per node.' },
  { prop: 'shape', type: "'circle' | 'square' | 'bean'", default: "'circle'", description: 'Node drawing shape.' },
  { prop: 'particleSpeed', type: 'number', default: '1', description: 'Node bounce speed multiplier.' },
  { prop: 'pointerTrackingSpeed', type: 'number', default: '0.06', description: 'How fast nodes respond to cursor proximity.' },
];

const BASIC_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

<ParticleBackground
  name="NET"
  height="60vh"
  backgroundColor="#050505"
/>`;

const FULL_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

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
/>`;

const HERO_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

// NET background combined with text particles
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
    text="Hello"
    particleColor={['255, 255, 255']}
    particleSize={1.8}
    isMagnet={true}
    particleShape="bean"
  />
</ParticleCanvas>`;

export default function NetPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background — NET fills the page */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground
          name="NET"
          width="100%"
          height="100%"
          backgroundColor="#070710"
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
          config={{
            density: 0.7,
            shape: 'circle',
            colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
            colorMode: 'mixed',
            particleSpeed: 1,
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
              Background Mode
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">NET</h2>
            <p className="text-white/50 text-base leading-relaxed">
              Nodes bounce around the canvas and draw lines between nearby pairs, creating a connected
              graph aesthetic. Look behind this content to see it live.
            </p>
          </div>

          {/* How it works */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">How it works</h3>
            <ul className="space-y-2 text-sm text-white/50 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-sky-400 shrink-0">1.</span>
                Nodes are distributed randomly across the canvas with random velocities.
              </li>
              <li className="flex gap-2">
                <span className="text-sky-400 shrink-0">2.</span>
                Each frame, nodes move and bounce off canvas edges elastically.
              </li>
              <li className="flex gap-2">
                <span className="text-sky-400 shrink-0">3.</span>
                Lines are drawn between nodes within a distance threshold. Line opacity fades with distance.
              </li>
              <li className="flex gap-2">
                <span className="text-sky-400 shrink-0">4.</span>
                The result is a continuously shifting connected graph — great for tech-style hero sections.
              </li>
            </ul>
          </div>

          {/* Config options */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-4">Configuration options</h3>
            <PropTable rows={CONFIG_PROPS} />
          </div>

          {/* Basic example */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">Basic usage</h3>
            <CodeBlock code={BASIC_CODE} language="tsx" />
          </div>

          {/* Full example */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">Customized NET</h3>
            <p className="text-sm text-white/45 mb-4">
              Blue-purple palette with mixed color assignment.
            </p>
            <CodeBlock code={FULL_CODE} language="tsx" />
          </div>

          {/* Combined with text */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-3">NET + text particles</h3>
            <p className="text-sm text-white/45 mb-4">
              Use the <code className="text-violet-300 font-mono text-xs">background</code> prop on{' '}
              <code className="text-violet-300 font-mono text-xs">ParticleCanvas</code> to layer NET behind text.
            </p>
            <CodeBlock code={HERO_CODE} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  );
}
