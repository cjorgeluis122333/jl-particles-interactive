import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import SectionWrapper from '../components/SectionWrapper';
import CodeBlock from '../components/CodeBlock';
import LiveDemo from '../components/LiveDemo';

const QUICK_START_CODE = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function App() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine text="Hello" />
    </ParticleCanvas>
  );
}`;

export default function QuickStartPage() {
  return (
    <SectionWrapper
      id="quick-start"
      title="Quick Start"
      subtitle="Two components, one import — particles appear immediately."
    >
      <div className="space-y-6">
        <p className="text-sm text-white/55 leading-relaxed">
          Wrap <code className="text-violet-300 font-mono text-xs">TextParticleEngine</code> inside a{' '}
          <code className="text-violet-300 font-mono text-xs">ParticleCanvas</code>. The canvas sizes itself to
          the container, detects device pixel ratio automatically, and starts animating on mount.
        </p>

        <CodeBlock code={QUICK_START_CODE} language="tsx" />

        <LiveDemo height="240px">
          <ParticleCanvas
            width="100%"
            height="100%"
            backgroundColor="#050505"
            style={{ borderRadius: 0 }}
          >
            <TextParticleEngine
              text="Hello"
              particleColor={['255, 255, 255']}
              particleSize={1.2}
              isMagnet={true}
              clickMode="repel"
            />
          </ParticleCanvas>
        </LiveDemo>

        <div className="grid sm:grid-cols-3 gap-3 mt-2">
          {[
            ['ParticleCanvas', 'Container div. Manages sizing, DPR, and the background engine slot.'],
            ['TextParticleEngine', 'The animation engine. Converts text → pixel targets → spring particles.'],
            ['isMagnet', 'Enables hover attraction. Particles spring toward the cursor within ~173px.'],
          ].map(([term, def]) => (
            <div key={term} className="p-3 rounded-lg bg-white/[0.03] border border-white/8">
              <code className="text-violet-300 text-xs font-mono">{term}</code>
              <p className="text-xs text-white/45 mt-1 leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
