import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import RepelExample from '../../../components/text-examples/RepelExample';

const CODE_SNIPPET = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function RepelExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text="Hello"
        particleColor={['244, 114, 182', '251, 146, 60', '250, 204, 21', '52, 211, 153', '96, 165, 250']}
        particleDensity={0.5}
        particleEase={1.2}
        isMagnet={true}
        clickMode="repel"
      />
    </ParticleCanvas>
  );
}`;

export default function RepelPage() {
  return (
    <SectionWrapper
      id="repel"
      title="Magnetic Hover + Repel"
      subtitle="Combine hover magnetic attraction with click-to-repel physics and multi-color palettes."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          Setting <code className="text-violet-300 font-mono text-xs">clickMode="repel"</code> causes particles to burst outward away from the pointer when clicked.
          Passing an array of RGB strings to <code className="text-violet-300 font-mono text-xs">particleColor</code> assigns a random color from the palette to each particle.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="300px">
            <RepelExample />
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
