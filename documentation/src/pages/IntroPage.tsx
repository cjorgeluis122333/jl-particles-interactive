import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParticleBackground } from 'jl-particle-interactive';
import { Copy, Check, ArrowRight } from 'lucide-react';

const INSTALL_CMD = 'npm install jl-particle-interactive';

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

export default function IntroPage() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hero section — full viewport with FOLLOW_POINTER background */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Particle background — fills entire hero */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground
            name="FOLLOW_POINTER"
            width="100%"
            height="100%"
            backgroundColor="#070710"
            style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
            config={{
              orientation: 'diagonal',
              density: 0.7,
              shape: 'bean',
              colors: ['#8b5cf6', '#6366f1', '#a78bfa', '#7c3aed'],
              colorMode: 'wave',
              pointerTrackingSpeed: 0.04,
            }}
          />
        </div>

        {/* Centered card */}
        <div className="relative z-10 w-full max-w-lg mx-auto px-6">
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-8 sm:p-10 shadow-2xl shadow-violet-500/5">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['v0.2.2', 'React 18+', 'TypeScript', 'Zero deps'].map(badge => (
                <span
                  key={badge}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-white/10 text-white/40 bg-white/[0.03]"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              jl-particle-interactive
            </h1>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-8">
              Canvas-based React library for rendering text and backgrounds as thousands of animated,
              interactive particles.
            </p>

            {/* Install command */}
            <div className="relative group mb-6">
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-violet-400 text-xs font-mono select-none shrink-0">$</span>
                <code className="text-sm font-mono text-white/80 flex-1 select-all">
                  {INSTALL_CMD}
                </code>
                <button
                  onClick={handleCopy}
                  className="text-white/30 hover:text-white/70 transition-colors shrink-0"
                  aria-label="Copy install command"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={() => navigate('/quick-start')}
              className="w-full flex items-center justify-center gap-2 bg-violet-600/80 hover:bg-violet-600 text-white text-sm font-medium py-3 rounded-xl transition-colors duration-200 border border-violet-500/30"
            >
              Get Started
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Below the fold — features & comparison */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Feature highlights */}
        <div className="mb-14">
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
        <div className="mb-14">
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
    </>
  );
}
