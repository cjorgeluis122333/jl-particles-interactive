import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import SectionWrapper from '../../components/SectionWrapper';
import CodeBlock from '../../components/CodeBlock';
import LiveDemo from '../../components/LiveDemo';

const REPEL_CODE = `<ParticleCanvas height="60vh" backgroundColor="#050505">
  <TextParticleEngine
    text="Hello 🖐️"
    particleColor={['244, 114, 182', '251, 146, 60', '250, 204, 21', '52, 211, 153', '96, 165, 250']}
    particleSize={1.3}
    particleEase={1.2}
    isMagnet={true}
    clickMode="repel"
    particleShape="circle"
  />
</ParticleCanvas>`;

const ATTRACT_CODE = `<ParticleCanvas height="60vh" backgroundColor="#050505">
  <TextParticleEngine
    text="Click me"
    particleColor={['250, 204, 21', '251, 146, 60', '244, 114, 182']}
    particleSize={1.2}
    particleEase={0.8}
    isMagnet={true}
    clickMode="attract"
    particleShape="circle"
  />
</ParticleCanvas>`;

const SHAPES_CODE = `// Circle (default) — soft round dots
<TextParticleEngine text="Circle" particleShape="circle" />

// Square — pixel-art style
<TextParticleEngine text="Square" particleShape="square" />

// Bean — oriented elongated ovals
<TextParticleEngine text="Bean" particleShape="bean" />`;

export default function TextIntermediatePage() {
  return (
    <SectionWrapper
      id="text-intermediate"
      title="Text Particles — Intermediate"
      subtitle="Interaction modes, color palettes, and particle shape variations."
    >
      <div className="space-y-12">
        {/* Interaction overview */}
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          Text particles support two interaction layers: <strong className="text-white/70">magnetic hover</strong> (particles
          spring toward the cursor) and <strong className="text-white/70">click modes</strong> (attract or repel on click).
          Combine them for rich interactive experiences.
        </p>

        {/* Repel example */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Magnetic hover + repel</h3>
          <p className="text-sm text-white/45 mb-4">
            Particles spring toward the cursor on hover. Click to repel them outward. Multi-color palettes
            assign a random color from the array to each particle.
          </p>
          <CodeBlock code={REPEL_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
            >
              <TextParticleEngine
                text="Hello 🖐️"
                particleColor={['244, 114, 182', '251, 146, 60', '250, 204, 21', '52, 211, 153', '96, 165, 250']}
                particleSize={1.3}
                particleEase={1.2}
                isMagnet={true}
                clickMode="repel"
                particleShape="circle"
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>

        {/* Attract example */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Click attract</h3>
          <p className="text-sm text-white/45 mb-4">
            Set <code className="text-violet-300 font-mono text-xs">clickMode="attract"</code> to swarm particles
            toward the cursor on click. Combine with <code className="text-violet-300 font-mono text-xs">isMagnet</code> for dual interaction.
          </p>
          <CodeBlock code={ATTRACT_CODE} language="tsx" />
          <LiveDemo height="220px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
            >
              <TextParticleEngine
                text="Click me"
                particleColor={['250, 204, 21', '251, 146, 60', '244, 114, 182']}
                particleSize={1.2}
                particleEase={0.8}
                isMagnet={true}
                clickMode="attract"
                particleShape="circle"
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>

        {/* Shape comparison */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Particle shapes</h3>
          <p className="text-sm text-white/45 mb-4">
            Three drawing shapes are available. Each changes the visual character of the particle field.
          </p>
          <CodeBlock code={SHAPES_CODE} language="tsx" />
          <div className="grid sm:grid-cols-3 gap-4 mt-5">
            {(['circle', 'square', 'bean'] as const).map(shape => (
              <div key={shape}>
                <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2 text-center">{shape}</p>
                <LiveDemo height="160px" label={shape}>
                  <ParticleCanvas
                    width="100%"
                    height="100%"
                    backgroundColor="#050505"
                    style={{ borderRadius: 0 }}
                  >
                    <TextParticleEngine
                      text={shape.charAt(0).toUpperCase() + shape.slice(1)}
                      particleColor={['167, 139, 250', '96, 165, 250']}
                      particleSize={1.2}
                      particleShape={shape}
                      isMagnet={true}
                    />
                  </ParticleCanvas>
                </LiveDemo>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
