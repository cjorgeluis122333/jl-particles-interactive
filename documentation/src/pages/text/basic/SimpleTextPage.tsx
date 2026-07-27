import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import SimpleTextExample from '../../../components/text-examples/SimpleTextExample';

const CODE_SNIPPET = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function SimpleTextExample() {
  return (
    <ParticleCanvas height="300px" backgroundColor="#050505">
      <TextParticleEngine
        text="Hello"
        particleColor="255, 255, 255"
        particleDensity={0.5}
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}`;

export default function SimpleTextPage() {
  return (
    <SectionWrapper
      id="simple-text"
      title="Simple Text Rendering"
      subtitle="Render clear animated particle text with spring physics and hover magnet interaction."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          Pass any string to the <code className="text-violet-300 font-mono text-xs">text</code> prop and particles will
          pixel-sample the characters and form the letters. Hovering the cursor near the text attracts particles with a soft spring magnetic force.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="300px">
            <SimpleTextExample />
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
