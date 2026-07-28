import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import AttractExample from '../../../components/text-examples/AttractExample';

const CODE_SNIPPET = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AttractExample() {
  return (
    <ParticleCanvas height="280px" backgroundColor="#050505">
      <TextParticleEngine
        text="Click"
        particleColor={['250, 204, 21', '251, 146, 60', '244, 114, 182']}
        particleDensity={0.5}
        particleEase={0.8}
        isMagnet={true}
        clickMode="attract"
      />
    </ParticleCanvas>
  );
}`;

export default function AttractPage() {
  return (
    <SectionWrapper
      id="attract"
      title="Click Attract"
      subtitle="Swarm particles forcefully towards the click position."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          With <code className="text-violet-300 font-mono text-xs">clickMode="attract"</code>, clicking anywhere on the canvas draws all nearby particles directly toward the cursor location, creating a lively swarming effect.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="280px">
            <AttractExample />
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
