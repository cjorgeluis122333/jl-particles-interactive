import { ParticleBackground } from 'jl-particle-interactive';
import CodeBlock from '../../components/CodeBlock';
import PropTable from '../../components/PropTable';

const CONFIG_PROPS = [
  { prop: 'orientation', type: "'vertical' | 'horizontal' | 'diagonal'", default: "'vertical'", description: 'Swarm drift direction between cursor interactions.' },
  { prop: 'density', type: 'number', default: '1', description: 'Particle count multiplier. Base count: 350 particles.' },
  { prop: 'color', type: 'string', description: 'Single hex color for all particles.' },
  { prop: 'colors', type: 'string[]', description: 'Palette of hex colors; overrides color.' },
  { prop: 'colorMode', type: "'wave' | 'mixed'", default: "'wave'", description: 'wave = gradient across particles, mixed = random per particle.' },
  { prop: 'shape', type: "'circle' | 'square' | 'bean'", default: "'bean'", description: 'Particle drawing shape.' },
  { prop: 'particleSpeed', type: 'number', default: '1', description: 'Animation speed multiplier.' },
  { prop: 'pointerTrackingSpeed', type: 'number', default: '0.06', description: 'How fast the swarm center follows the cursor. Lower = floatier.' },
];

const BASIC_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

<ParticleBackground
  name="FOLLOW_POINTER"
  height="60vh"
  backgroundColor="#050505"
/>`;

const FULL_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

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
/>`;

const FULLSCREEN_CODE = `import { ParticleBackground } from 'jl-particle-interactive';

// Full-screen background behind page content
<div style={{ position: 'relative' }}>
  <ParticleBackground
    name="FOLLOW_POINTER"
    width="100%"
    height="100vh"
    backgroundColor="#050505"
    style={{ position: 'fixed', inset: 0, borderRadius: 0, border: 'none', boxShadow: 'none' }}
    config={{
      density: 0.8,
      colors: ['#8b5cf6', '#6366f1', '#a78bfa'],
      colorMode: 'wave',
    }}
  />
  <div style={{ position: 'relative', zIndex: 10 }}>
    {/* Your page content here */}
  </div>
</div>`;

export default function FollowPointerPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background — FOLLOW_POINTER fills the page */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground
          name="FOLLOW_POINTER"
          width="100%"
          height="100%"
          backgroundColor="#070710"
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
          config={{
            orientation: 'diagonal',
            density: 0.6,
            shape: 'bean',
            colors: ['#00d4ff', '#6ee7b7', '#a78bfa'],
            colorMode: 'wave',
            pointerTrackingSpeed: 0.05,
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              Background Mode
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">FOLLOW_POINTER</h2>
            <p className="text-white/50 text-base leading-relaxed">
              Particles form a loose swarm that chases the cursor. The swarm drifts along the configured
              orientation between cursor interactions. Move your cursor around this page to see it in action.
            </p>
          </div>

          {/* How it works */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">How it works</h3>
            <ul className="space-y-2 text-sm text-white/50 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">1.</span>
                Particles are initialized at random positions with varying depth (z) values for 3D parallax effect.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">2.</span>
                The swarm center smoothly interpolates toward the cursor at <code className="text-violet-300 font-mono text-xs">pointerTrackingSpeed</code> rate.
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">3.</span>
                Each particle orbits the swarm center with velocity influenced by its depth — deeper particles move slower (parallax).
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">4.</span>
                Color waves propagate across particles based on their position, creating flowing gradients.
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
            <p className="text-sm text-white/45 mb-4">
              The simplest setup — defaults to bean shape, vertical orientation, and wave color mode.
            </p>
            <CodeBlock code={BASIC_CODE} language="tsx" />
          </div>

          {/* Full example */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="text-base font-semibold text-white mb-3">Customized swarm</h3>
            <p className="text-sm text-white/45 mb-4">
              Diagonal drift with a tri-color wave palette.
            </p>
            <CodeBlock code={FULL_CODE} language="tsx" />
          </div>

          {/* Fullscreen example */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-base font-semibold text-white mb-3">Full-screen background</h3>
            <p className="text-sm text-white/45 mb-4">
              Use <code className="text-violet-300 font-mono text-xs">position: fixed</code> to cover the entire
              viewport. Content renders on top with <code className="text-violet-300 font-mono text-xs">z-index: 10</code>.
              This is exactly what this documentation page does.
            </p>
            <CodeBlock code={FULLSCREEN_CODE} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  );
}
