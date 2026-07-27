import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import ShapesExample from '../../../components/text-examples/ShapesExample';

const CODE_SNIPPET = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function ShapesExample() {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2 text-center">Circle</p>
        <ParticleCanvas height="180px" backgroundColor="#050505">
          <TextParticleEngine
            text="Circle"
            particleColor={['167, 139, 250', '96, 165, 250']}
            particleDensity={0.3}
            particleShape="circle"
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>

      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2 text-center">Square</p>
        <ParticleCanvas height="180px" backgroundColor="#050505">
          <TextParticleEngine
            text="Square"
            particleColor={['167, 139, 250', '96, 165, 250']}
            particleDensity={0.3}
            particleShape="square"
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>

      <div>
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2 text-center">Bean</p>
        <ParticleCanvas height="180px" backgroundColor="#050505">
          <TextParticleEngine
            text="Bean"
            particleColor={['167, 139, 250', '96, 165, 250']}
            particleDensity={0.3}
            particleShape="bean"
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>
    </div>
  );
}`;

export default function ShapesPage() {
  return (
    <SectionWrapper
      id="shapes"
      title="Particle Shapes"
      subtitle="Compare the three available particle drawing shapes: circle, square, and bean."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          The <code className="text-violet-300 font-mono text-xs">particleShape</code> prop allows choosing between standard round dots (<code className="text-violet-300 font-mono text-xs">"circle"</code>), retro pixel art squares (<code className="text-violet-300 font-mono text-xs">"square"</code>), and directionally oriented elongated ovals (<code className="text-violet-300 font-mono text-xs">"bean"</code>).
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="220px">
            <ShapesExample />
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
