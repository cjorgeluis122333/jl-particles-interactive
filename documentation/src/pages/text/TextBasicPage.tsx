import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';
import SectionWrapper from '../../components/SectionWrapper';
import CodeBlock from '../../components/CodeBlock';
import PropTable from '../../components/PropTable';
import LiveDemo from '../../components/LiveDemo';

const PROPS = [
  { prop: 'text', type: 'string', description: "Text to form. Pass '' (empty string) to scatter particles freely as ambient float." },
  { prop: 'particleColor', type: "string | string[]", default: "'255, 255, 255'", description: "RGB string(s) in 'R, G, B' format. Array: each particle picks a random color from the list." },
  { prop: 'particleSize', type: 'number', default: '1', description: 'Size multiplier. 0.5 = small dots, 2 = large blobs.' },
  { prop: 'particleDensity', type: 'number', default: '1', description: 'Count multiplier. Base: 3000 desktop / 1500 mobile. 0.5 = half, 2 = double.' },
  { prop: 'particleEase', type: 'number', default: '1', description: 'Spring speed toward target. Higher = snappier, lower = floatier.' },
  { prop: 'isMagnet', type: 'boolean', default: 'true', description: 'Enable hover magnetic attraction (~173px radius spring force).' },
  { prop: 'clickMode', type: "'none' | 'attract' | 'repel'", default: "'none'", description: "Click behavior: attract swarms particles, repel pushes them outward." },
  { prop: 'particleShape', type: "'circle' | 'square' | 'bean'", default: "'circle'", description: 'Particle drawing shape. Bean is an oriented elongated oval.' },
  { prop: 'backgroundColor', type: 'string', default: "'#050505'", description: "Hex background for trail-fade effect. Pass 'transparent' to disable fading." },
];

const FREE_FLOAT_CODE = `<ParticleCanvas height="300px" backgroundColor="#050505">
  <TextParticleEngine
    text=""
    particleColor={['60, 165, 250', '167, 139, 250', '52, 211, 153']}
    particleSize={1.2}
    particleDensity={0.5}
    isMagnet={true}
  />
</ParticleCanvas>`;

const HELLO_CODE = `<ParticleCanvas height="300px" backgroundColor="#050505">
  <TextParticleEngine
    text="Hello"
    particleColor="255, 255, 255"
    particleDensity={0.5}
    isMagnet={true}
  />
</ParticleCanvas>`;

export default function TextBasicPage() {
  return (
    <SectionWrapper
      id="text-basic"
      title="Text Particles — Basic"
      subtitle="Get started with the TextParticleEngine: free-floating particles and simple text rendering."
    >
      <div className="space-y-12">
        {/* Overview */}
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          The engine uses an offscreen canvas to pixel-sample the text, then assigns each sampled pixel as a
          spring-target for a particle. Particles travel to their targets using spring physics with friction and
          idle float-noise. Passing <code className="text-violet-300 font-mono text-xs">text=""</code> (empty string)
          scatters particles freely — useful for ambient background effects.
        </p>

        {/* Props table */}
        <div>
          <h3 className="text-base font-semibold text-white mb-4">TextParticleEngine Props</h3>
          <PropTable rows={PROPS} />
          <p className="mt-3 text-xs text-white/35">
            ⚠ <code className="font-mono">particleColor</code> values must be in{' '}
            <code className="font-mono">'R, G, B'</code> format (integers 0–255), <strong>not</strong> hex.
          </p>
        </div>

        {/* Example 1: Free-floating */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Free-floating ambient</h3>
          <p className="text-sm text-white/45 mb-4">
            Pass <code className="text-violet-300 font-mono text-xs">text=""</code> to scatter particles freely.
            Great for loading screens or decorative backgrounds.
          </p>
          <CodeBlock code={FREE_FLOAT_CODE} language="tsx" />
          <LiveDemo height="300px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
            >
              <TextParticleEngine
                text=""
                particleColor={['60, 165, 250', '167, 139, 250', '52, 211, 153']}
                particleSize={1.2}
                particleDensity={0.5}
                isMagnet={true}
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>

        {/* Example 2: Simple Hello */}
        <div>
          <h3 className="text-base font-semibold text-white mb-1">Simple text rendering</h3>
          <p className="text-sm text-white/45 mb-4">
            Pass any string to <code className="text-violet-300 font-mono text-xs">text</code> and particles will
            form the letters. Hover to attract particles toward the cursor.
          </p>
          <CodeBlock code={HELLO_CODE} language="tsx" />
          <LiveDemo height="300px">
            <ParticleCanvas
              width="100%"
              height="100%"
              backgroundColor="#050505"
              style={{ borderRadius: 0 }}
            >
              <TextParticleEngine
                text="Hello"
                particleColor="255, 255, 255"
                particleDensity={0.5}
                isMagnet={true}
              />
            </ParticleCanvas>
          </LiveDemo>
        </div>
      </div>
    </SectionWrapper>
  );
}
