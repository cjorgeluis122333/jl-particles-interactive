import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import MultilineTextExample from '../../../components/text-examples/MultilineTextExample';

const CODE_SNIPPET = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function MultilineTextExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text={['Multi-line', 'Text', 'Support']}
        particleColor={['#60a5fa', '#34d399', '#f472b6']}
        particleDensity={0.8}
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}`;

export default function MultilinePage() {
  return (
    <SectionWrapper
      id="multiline-text"
      title="Multiline Text Rendering"
      subtitle="Render multiple lines of animated particle text with auto-scaling and vertical centering."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          By passing an <strong className="text-white">array of strings</strong> to the <code className="text-violet-300 font-mono text-xs">text</code> prop, the engine will render multiple lines of text simultaneously. It automatically calculates the correct spacing, scales down the font size based on the number of lines, and vertically centers the overall text block inside the container.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="300px">
            <MultilineTextExample />
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
