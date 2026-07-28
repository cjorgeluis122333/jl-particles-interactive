import SectionWrapper from '../components/SectionWrapper';
import CodeBlock from '../components/CodeBlock';
import PropTable from '../components/PropTable';

const CANVAS_PROPS = [
  { prop: 'children', type: 'ReactNode', description: 'Content rendered above the background (z-index 10). Typically a TextParticleEngine.' },
  { prop: 'width', type: 'string | number', default: "'100%'", description: 'CSS-valid width.' },
  { prop: 'height', type: 'string | number', default: "'60vh'", description: 'CSS-valid height.' },
  { prop: 'backgroundColor', type: 'string', default: "'#050505'", description: 'Hex color for the container background.' },
  { prop: 'background', type: 'BackgroundCanvas', default: "{ name: 'NONE' }", description: "Background engine config. Pass { name: 'NET', ... } to activate a background." },
  { prop: 'className', type: 'string', description: 'CSS class applied to the container div.' },
  { prop: 'style', type: 'CSSProperties', description: 'Inline styles merged over base container styles.' },
];

const TEXT_ENGINE_PROPS = [
  { prop: 'text', type: 'string', description: "Text to form. Pass '' (empty string) to scatter particles freely." },
  { prop: 'particleColor', type: "string | string[]", default: "'255, 255, 255'", description: "RGB string(s) in 'R, G, B' format. Array = random pick per particle." },
  { prop: 'particleSize', type: 'number', default: '1', description: 'Size multiplier (0.5 = small, 2 = large).' },
  { prop: 'particleDensity', type: 'number', default: '1', description: 'Count multiplier. Base: 3000 desktop / 1500 mobile.' },
  { prop: 'particleEase', type: 'number', default: '1', description: 'Spring speed toward target.' },
  { prop: 'isMagnet', type: 'boolean', default: 'true', description: 'Enable hover magnetic attraction (~173px radius).' },
  { prop: 'clickMode', type: "'none' | 'attract' | 'repel'", default: "'none'", description: 'Click behavior: attract swarms, repel pushes outward.' },
  { prop: 'particleShape', type: "'circle' | 'square' | 'bean'", default: "'circle'", description: 'Particle drawing shape.' },
  { prop: 'backgroundColor', type: 'string', default: "'#050505'", description: "Hex background for trail-fade. 'transparent' disables fading." },
];

const PBG_PROPS = [
  { prop: 'name', type: "'NONE' | 'FOLLOW_POINTER' | 'NET' | 'JELLYFISH'", default: "'FOLLOW_POINTER'", description: 'Background engine to render.' },
  { prop: 'config', type: 'Omit<BackgroundCanvas, "name">', description: 'Engine options: density, color, colors, colorMode, shape, particleSpeed, pointerTrackingSpeed, orientation.' },
  { prop: 'width', type: 'string | number', default: "'100%'", description: 'Container width.' },
  { prop: 'height', type: 'string | number', default: "'60vh'", description: 'Container height.' },
  { prop: 'backgroundColor', type: 'string', default: "'#050505'", description: 'Background fill color.' },
  { prop: 'className', type: 'string', description: 'Additional CSS class.' },
  { prop: 'style', type: 'CSSProperties', description: 'Inline style overrides.' },
];

const INTERACTION_HOOK_CODE = `const mouseRef = useParticleInteraction(containerRef);
// mouseRef.current: { x: number, y: number, isDown: boolean, active: boolean }`;

const MAGNET_CODE = `import { getMagnetTarget } from 'jl-particle-interactive';

const { x, y } = getMagnetTarget(
  particleX, particleY,     // current particle position
  targetX,   targetY,       // natural target (text pixel)
  mouseX,    mouseY,        // pointer position (null when outside)
  isMouseDown,
  isMagnet,
  clickMode
);`;

const TEXT_PARTICLES_HOOK_CODE = `const { updateTextTargets } = useTextParticles(text, particlesRef, containerRef);

updateTextTargets('New Text');              // reassign using current container size
updateTextTargets('New Text', width, height); // with explicit dimensions`;

const TYPES_CODE = `// ClickMode
type ClickMode = 'none' | 'attract' | 'repel';

// ColorMode
type ColorMode = 'single' | 'palette';

// ParticleShape
type ParticleShape = 'circle' | 'square' | 'bean';

// BackgroundModeName
type BackgroundModeName = 'NONE' | 'FOLLOW_POINTER' | 'NET' | 'JELLYFISH';

// ParticleOrientation
type ParticleOrientation = 'vertical' | 'horizontal' | 'diagonal';

// BackgroundCanvas
interface BackgroundCanvas {
  name: BackgroundModeName;
  orientation?: ParticleOrientation;
  density?: number;
  color?: string;
  colors?: string[];
  colorMode?: 'wave' | 'mixed';
  shape?: ParticleShape;
  particleSpeed?: number;
  pointerTrackingSpeed?: number;
  interactionRadius?: number; // reserved, not applied in v0.2.2
  lineDistance?: number;      // reserved, not applied in v0.2.2
}`;

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-4 border-t border-white/8">
      <h3 className="text-base font-semibold text-white mb-5">{title}</h3>
      {children}
    </div>
  );
}

export default function ApiReferencePage() {
  return (
    <SectionWrapper
      id="api"
      title="API Reference"
      subtitle="Full reference for every exported symbol."
    >
      <div className="space-y-10">

        <SubSection title="<ParticleCanvas>">
          <p className="text-sm text-white/50 mb-4 leading-relaxed">
            Container div that establishes the particle stage. Manages sizing, device pixel ratio scaling,
            and the optional background engine slot. Children render at z-index 10 above the background.
          </p>
          <PropTable rows={CANVAS_PROPS} />
          <p className="mt-3 text-xs text-white/35">
            Base styles applied automatically:{' '}
            <code className="font-mono">position: relative</code>,{' '}
            <code className="font-mono">border-radius: 1rem</code>,{' '}
            <code className="font-mono">overflow: hidden</code>,{' '}
            <code className="font-mono">box-shadow</code>,{' '}
            <code className="font-mono">border: 1px solid rgba(255,255,255,0.1)</code>.
          </p>
        </SubSection>

        <SubSection title="<TextParticleEngine>">
          <p className="text-sm text-white/50 mb-4 leading-relaxed">
            The core animation engine. Renders <code className="text-violet-300 font-mono text-xs">text</code> as
            animated particles that form letter shapes using pixel-sampling. Must be placed inside{' '}
            <code className="text-violet-300 font-mono text-xs">ParticleCanvas</code> or any{' '}
            <code className="font-mono text-xs text-sky-300">position: relative</code> container.
          </p>
          <PropTable rows={TEXT_ENGINE_PROPS} />
          <div className="mt-3 p-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
            <p className="text-xs text-amber-200/70 leading-relaxed">
              ⚠ <code className="font-mono">particleColor</code> must be in{' '}
              <strong className="text-amber-200/90">'R, G, B'</strong> format (comma-separated integers 0–255),
              not hex. Example: <code className="font-mono text-amber-300">'96, 165, 250'</code> not{' '}
              <code className="font-mono">'#60a5fa'</code>.
            </p>
          </div>
        </SubSection>

        <SubSection title="<ParticleBackground>">
          <p className="text-sm text-white/50 mb-4 leading-relaxed">
            Unified background component. Selects the engine via the{' '}
            <code className="text-violet-300 font-mono text-xs">name</code> prop (promoted to top-level).
            No children slot — use <code className="text-violet-300 font-mono text-xs">ParticleCanvas</code> when
            you need text particles alongside a background.
          </p>
          <PropTable rows={PBG_PROPS} />
        </SubSection>

        <SubSection title="useParticleInteraction">
          <p className="text-sm text-white/50 mb-4 leading-relaxed">
            Tracks pointer events (pointermove, pointerleave, pointerdown, pointerup) on a container element.
            Returns a ref with live pointer state. Sets{' '}
            <code className="font-mono text-xs text-sky-300">touchAction: 'none'</code> on the container automatically.
          </p>
          <CodeBlock code={INTERACTION_HOOK_CODE} language="ts" />
          <div className="mt-4 space-y-1.5">
            {[
              ['x', 'number', 'Pointer X relative to the container.'],
              ['y', 'number', 'Pointer Y relative to the container.'],
              ['isDown', 'boolean', 'Whether a pointer button is pressed.'],
              ['active', 'boolean', 'Whether the pointer is inside the container.'],
            ].map(([name, type, desc]) => (
              <div key={name} className="flex gap-3 text-sm">
                <code className="text-violet-300 font-mono text-xs shrink-0 w-16">{name}</code>
                <code className="text-sky-300 font-mono text-xs shrink-0 w-16">{type}</code>
                <span className="text-white/45 text-xs">{desc}</span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="getMagnetTarget">
          <p className="text-sm text-white/50 mb-4 leading-relaxed">
            Pure function. Computes the effective target position for a particle given magnetic forces.
            Used inside particle <code className="font-mono text-xs text-sky-300">update()</code> loops.
            Uses squared-distance comparisons (no sqrt until repel).
          </p>
          <CodeBlock code={MAGNET_CODE} language="ts" />
          <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/8 text-xs text-white/45 space-y-1">
            <p>Force radii:</p>
            <p>• Hover magnet: 30,000 px² (~173px), force × 0.15</p>
            <p>• Attract (click): 30,000 px² (~173px), force × 0.8</p>
            <p>• Repel (click): 50,000 px² (~224px), force × 400px push distance</p>
          </div>
        </SubSection>

        <SubSection title="useTextParticles">
          <p className="text-sm text-white/50 mb-4 leading-relaxed">
            Converts text into target positions using an offscreen canvas. Returns{' '}
            <code className="text-violet-300 font-mono text-xs">updateTextTargets</code> which reassigns all
            particle targets. Passing an empty string scatters particles randomly.
          </p>
          <CodeBlock code={TEXT_PARTICLES_HOOK_CODE} language="ts" />
        </SubSection>

        <SubSection title="Types">
          <CodeBlock code={TYPES_CODE} language="ts" />
        </SubSection>
      </div>
    </SectionWrapper>
  );
}
