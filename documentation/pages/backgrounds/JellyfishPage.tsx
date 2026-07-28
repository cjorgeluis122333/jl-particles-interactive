import { ParticleBackground } from 'jl-particle-interactive';
import CodeBlock from '../../components/CodeBlock';
import PropTable from '../../components/PropTable';

const CONFIG_PROPS = [
  { prop: 'density', type: 'number', default: '1', description: 'Particle count multiplier. Base count: 350 particles.' },
  { prop: 'color', type: 'string', description: 'Single hex color for glow rings.' },
  { prop: 'colors', type: 'string[]', description: 'Palette of hex colors; overrides color.' },
  { prop: 'colorMode', type: "'wave' | 'mixed'", default: "'wave'", description: 'wave = gradient glow rings, mixed = random per ring.' },
  { prop: 'shape', type: "'circle' | 'square' | 'bean'", default: "'circle'", description: 'Particle drawing shape.' },
  { prop: 'particleSpeed', type: 'number', default: '1', description: 'Animation speed multiplier.' },
  { prop: 'pointerTrackingSpeed', type: 'number', default: '0.02', description: 'How fast particles follow cursor. Defaults low for organic feel.' },
];

const BASIC_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

<ParticleBackground
  name="JELLYFISH"
  height="60vh"
  backgroundColor="#050505"
/>`;

const FULL_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

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
/>`;

const FULLSCREEN_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

// Full-screen JELLYFISH behind page content
<div style={{ position: 'relative' }}>
  <ParticleBackground
    name="JELLYFISH"
    width="100%"
    height="100vh"
    backgroundColor="#020208"
    style={{ position: 'fixed', inset: 0, borderRadius: 0, border: 'none', boxShadow: 'none' }}
    config={{
      density: 1.2,
      colors: ['#f472b6', '#a78bfa', '#22d3ee'],
      colorMode: 'wave',
      pointerTrackingSpeed: 0.02,
    }}
  />
  <div style={{ position: 'relative', zIndex: 10 }}>
    {/* Your page content here */}
  </div>
</div>`;

export default function JellyfishPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background — JELLYFISH fills the page */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground
          name="JELLYFISH"
          width="100%"
          height="100%"
          backgroundColor="#070710"
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
          config={{
            density: 0.8,
            shape: 'circle',
            colors: ['#f472b6', '#a78bfa', '#22d3ee'],
            colorMode: 'wave',
            pointerTrackingSpeed: 0.02,
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-4">
              Background Mode
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">JELLYFISH</h2>
            <p className="text-white/50 text-base leading-relaxed">
              Soft concentric rings expand and contract in a slow breathing cycle.
              Particles drift with organic float noise. Watch the gentle pulse behind this content.
            </p>
          </div>

          {/* How it works */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">How it works</h3>
            <ul className="space-y-2 text-sm text-white/50 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-pink-400 shrink-0">1.</span>
                Particles are arranged in concentric rings around the swarm center.
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 shrink-0">2.</span>
                A built-in breathing cycle runs: <strong className="text-white/60">1 second</strong> of active radial contraction
                followed by <strong className="text-white/60">3 seconds</strong> of relaxation.
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 shrink-0">3.</span>
                During contraction, particles pull inward. During relaxation, they gently expand outward with float noise.
              </li>
              <li className="flex gap-2">
                <span className="text-pink-400 shrink-0">4.</span>
                The swarm center tracks the cursor at a slow rate (<code className="text-violet-300 font-mono text-xs">0.02</code>) for a floating, organic feel.
              </li>
            </ul>
          </div>

          {/* Breathing cycle detail */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">Breathing cycle</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-pink-500/5 border border-pink-500/10">
                <p className="text-sm font-medium text-pink-300 mb-1">Active phase (1s)</p>
                <p className="text-xs text-white/45 leading-relaxed">
                  Particles contract radially toward center. Rings tighten. Glow intensifies.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-violet-500/5 border border-violet-500/10">
                <p className="text-sm font-medium text-violet-300 mb-1">Relaxation phase (3s)</p>
                <p className="text-xs text-white/45 leading-relaxed">
                  Particles expand outward gently. Float noise adds organic drift. Glow softens.
                </p>
              </div>
            </div>
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
            <h3 className="text-base font-semibold text-white mb-3">Customized JELLYFISH</h3>
            <p className="text-sm text-white/45 mb-4">
              Pink-violet-cyan palette with wave color propagation.
            </p>
            <CodeBlock code={FULL_CODE} language="tsx" />
          </div>

          {/* Fullscreen example */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-3">Full-screen background</h3>
            <p className="text-sm text-white/45 mb-4">
              This is exactly what this documentation page does — a fixed JELLYFISH behind scrollable content.
            </p>
            <CodeBlock code={FULLSCREEN_CODE} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  );
}
