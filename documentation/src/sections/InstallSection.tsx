import SectionWrapper from '../components/SectionWrapper';
import CodeBlock from '../components/CodeBlock';

const INSTALL_CODE = `npm install jl-particle-interactive`;

const NEXTJS_CODE = `// Next.js App Router — add 'use client' at the top
'use client';

import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function HeroSection() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine text="Hello" />
    </ParticleCanvas>
  );
}`;

const FRAMEWORKS = [
  { name: 'Vite + React', supported: true },
  { name: 'Next.js (App Router & Pages)', supported: true, note: "add 'use client'" },
  { name: 'Create React App', supported: true },
  { name: 'Remix', supported: true, note: 'client-side only' },
  { name: 'Astro', supported: true, note: "inside client:only components" },
  { name: 'TypeScript', supported: true, note: 'strict mode, declarations included' },
];

export default function InstallSection() {
  return (
    <SectionWrapper
      id="install"
      title="Installation"
      subtitle="One command, zero runtime dependencies."
    >
      <div className="space-y-8">
        {/* npm install */}
        <div>
          <CodeBlock code={INSTALL_CODE} language="bash" />
          <p className="mt-3 text-sm text-white/45">
            Requires <code className="text-violet-300 font-mono text-xs">react</code> and{' '}
            <code className="text-violet-300 font-mono text-xs">react-dom</code>{' '}
            <span className="text-white/30">&gt;= 18</span> as peer dependencies.
          </p>
        </div>

        {/* Framework compatibility */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">Framework compatibility</h3>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-4 py-3 text-left text-xs text-white/40 font-semibold uppercase tracking-wider">
                    Framework
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-white/40 font-semibold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {FRAMEWORKS.map((fw, i) => (
                  <tr key={fw.name} className={i % 2 === 0 ? '' : 'bg-white/[0.018]'}>
                    <td className="px-4 py-2.5 border-b border-white/5 text-white/70 text-sm">{fw.name}</td>
                    <td className="px-4 py-2.5 border-b border-white/5 text-sm">
                      <span className="text-emerald-400 mr-2">✓</span>
                      {fw.note && (
                        <span className="text-white/35 text-xs">({fw.note})</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Next.js note */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">Next.js note</h3>
          <p className="text-sm text-white/50 mb-3">
            All components use browser-only APIs (canvas, ResizeObserver, requestAnimationFrame).
            In Next.js App Router, add <code className="text-violet-300 font-mono text-xs">'use client'</code> to any
            file that imports from this library.
          </p>
          <CodeBlock code={NEXTJS_CODE} language="tsx" />
        </div>

        {/* Zero deps callout */}
        <div className="flex gap-3 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
          <span className="text-violet-400 shrink-0 mt-0.5">ℹ</span>
          <p className="text-sm text-white/60 leading-relaxed">
            This library has <strong className="text-white/80">zero runtime dependencies</strong>.
            Only <code className="text-violet-300 font-mono text-xs">react</code> and{' '}
            <code className="text-violet-300 font-mono text-xs">react-dom</code> are peer dependencies — they are
            not bundled. Your bundle stays lean.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
