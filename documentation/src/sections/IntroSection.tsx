import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import LiveDemo from '../components/LiveDemo';

const FEATURES = [
  { icon: '✦', label: 'Text particles', desc: 'Thousands of canvas particles form any text using pixel-sampling with spatial coherence.' },
  { icon: '✦', label: 'Magnetic hover', desc: 'Particles spring toward the cursor on hover (~173px radius force field).' },
  { icon: '✦', label: 'Click interactions', desc: 'Attract or repel particles on click — they swarm toward or flee from the pointer.' },
  { icon: '✦', label: 'Background presets', desc: 'NET (connected node graph), JELLYFISH (organic glow), and FOLLOW_POINTER (swarm) modes.' },
  { icon: '✦', label: 'Spring physics', desc: 'Each particle uses spring + friction + float-noise physics — movement feels natural.' },
  { icon: '✦', label: 'Zero runtime deps', desc: 'Only React 18 peer dependency. No extra packages bundled into your app.' },
];

const COMPARISON = [
  { feature: 'Text that forms from particles', jl: true, tsparticles: 'Plugin only', particles: false },
  { feature: 'Spring physics + float noise', jl: true, tsparticles: false, particles: false },
  { feature: 'Magnetic hover / click interact', jl: true, tsparticles: false, particles: false },
  { feature: 'Ready-made background presets', jl: 'NET, JELLYFISH, FOLLOW_POINTER', tsparticles: 'DIY', particles: 'DIY' },
  { feature: 'Runtime dependencies', jl: 'Zero', tsparticles: '14+ packages', particles: '0 (vanilla only)' },
  { feature: 'React integration', jl: 'Native hooks', tsparticles: 'Wrapper needed', particles: 'Manual' },
  { feature: 'TypeScript', jl: 'Strict mode', tsparticles: 'Partial', particles: false },
  { feature: 'DPR-aware (retina)', jl: true, tsparticles: false, particles: false },
];

function CellValue({ val }: { val: boolean | string }) {
  if (val === true) return <span className="text-emerald-400">✓</span>;
  if (val === false) return <span className="text-white/25">✗</span>;
  return <span className="text-white/60 text-xs">{val}</span>;
}

export default function IntroSection() {
  return (
    <section id="intro" className="border-b border-white/5 scroll-mt-16">
      {/* Hero live demo */}
      <div className="max-w-4xl mx-auto px-6 pt-14 pb-4">
        <LiveDemo height="260px" label="Interactive Hero">
          <ParticleCanvas
            width="100%"
            height="100%"
            backgroundColor="#050505"
            style={{ borderRadius: 0 }}
          >
            <TextParticleEngine
              text="Hello 🖐️"
              particleColor={['255, 100, 200', '120, 180, 255', '100, 230, 180', '255, 200, 80']}
              particleSize={1.4}
              particleEase={1.2}
              isMagnet={true}
              clickMode="repel"
              particleShape="bean"
            />
          </ParticleCanvas>
        </LiveDemo>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">jl-particle-interactive</h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
            A canvas-based React library for rendering text and backgrounds as thousands of animated particles.
            Letters form from particle swarms, respond to magnetic hover, attract or repel on click, and backgrounds
            come alive with NET graphs, JELLYFISH glows, or pointer-following swarms.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Zero runtime deps', 'TypeScript strict', 'React 18+', 'DPR-aware'].map(badge => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-full text-xs border border-white/15 text-white/50 bg-white/5"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5">What it offers</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map(f => (
              <div key={f.label} className="flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/8">
                <span className="text-violet-400 text-sm mt-0.5 shrink-0">{f.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white mb-1">{f.label}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5">Why jl-particle-interactive?</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-3 text-left text-xs text-white/40 font-semibold uppercase tracking-wider border-b border-white/10">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-violet-400 font-semibold uppercase tracking-wider border-b border-white/10">
                    jl-particle-interactive
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-white/40 font-semibold uppercase tracking-wider border-b border-white/10">
                    tsparticles
                  </th>
                  <th className="px-4 py-3 text-center text-xs text-white/40 font-semibold uppercase tracking-wider border-b border-white/10">
                    particles.js
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.018]'}>
                    <td className="px-4 py-2.5 border-b border-white/5 text-white/60 text-xs">{row.feature}</td>
                    <td className="px-4 py-2.5 border-b border-white/5 text-center text-xs font-medium">
                      <CellValue val={row.jl} />
                    </td>
                    <td className="px-4 py-2.5 border-b border-white/5 text-center text-xs">
                      <CellValue val={row.tsparticles} />
                    </td>
                    <td className="px-4 py-2.5 border-b border-white/5 text-center text-xs">
                      <CellValue val={row.particles} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Use cases */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-5">Use cases</h2>
          <ul className="space-y-3">
            {[
              ['Hero section animated titles', 'Text materializes from particle chaos on page load.'],
              ['Loading screens', 'Words form and dissolve while content loads.'],
              ['Interactive word carousels', 'Cycle through words; particles re-form smoothly on each change.'],
              ['Animated backgrounds', 'NET graph, JELLYFISH glow, or pointer-following swarm behind any content.'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-3">
                <span className="text-violet-400 mt-1 shrink-0">→</span>
                <span>
                  <span className="text-white/80 text-sm font-medium">{title}</span>
                  <span className="text-white/45 text-sm"> — {desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
