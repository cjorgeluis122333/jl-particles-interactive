import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import LoadingScreenExample from '../../../components/text-examples/LoadingScreenExample';

const CODE_SNIPPET = `import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function LoadingScreenExample() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', background: '#050505' }}>
      <ParticleCanvas
        width="100%"
        height="100%"
        backgroundColor="#050505"
        style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
      >
        <TextParticleEngine
          text="Loading..."
          particleColor={['167, 139, 250', '96, 165, 250']}
          particleDensity={0.5}
          isMagnet={false}
        />
      </ParticleCanvas>
    </div>
  );
}`;

export default function LoadingScreenPage() {
  return (
    <SectionWrapper
      id="loading-screen"
      title="Loading Screen"
      subtitle="Full-bleed particle loading state without magnetic hover interactivity."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          By setting <code className="text-violet-300 font-mono text-xs">isMagnet={'{false}'}</code>, particles remain stable in their float and spring states without responding to pointer movement — ideal for immersive loading screens or static hero headers.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="300px">
            <LoadingScreenExample />
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
