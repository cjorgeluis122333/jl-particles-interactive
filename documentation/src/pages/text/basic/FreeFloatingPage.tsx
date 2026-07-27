import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import FreeFloatingExample from '../../../components/text-examples/FreeFloatingExample';

const CODE_SNIPPET = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function FreeFloatingExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text=""
        particleColor={['60, 165, 250', '167, 139, 250', '52, 211, 153']}
        particleSize={1.2}
        particleDensity={0.5}
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}`;

export default function FreeFloatingPage() {
  return (
    <SectionWrapper
      id="free-floating"
      title="Free-floating Ambient"
      subtitle="Scatter particles freely as ambient background movement without forming text."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          Passing <code className="text-violet-300 font-mono text-xs">text=""</code> (an empty string) to{' '}
          <code className="text-violet-300 font-mono text-xs">TextParticleEngine</code> scatters particles freely across the container.
          This is useful for subtle ambient background effects, loading states, or hero section decoration.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="300px">
            <FreeFloatingExample />
          </LiveDemo>
        </div>

        {/* Code */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Code</h3>
          <CodeBlock code={CODE_SNIPPET} language="tsx" />
        </div>
      </div>
    </SectionWrapper>
  );
}
