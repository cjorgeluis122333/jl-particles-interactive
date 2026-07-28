import SectionWrapper from '../../../components/SectionWrapper';
import CodeBlock from '../../../components/CodeBlock';
import LiveDemo from '../../../components/LiveDemo';
import DynamicInputExample from '../../../components/text-examples/DynamicInputExample';

const CODE_SNIPPET = `import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function DynamicInputExample() {
  const [val, setVal] = useState("Write\\nSomething");

  return (
    <div className="flex flex-col h-[360px] bg-[#050505] rounded-xl overflow-hidden border border-white/10">
      <div className="flex-1 relative">
        <ParticleCanvas height="100%" backgroundColor="transparent">
          <TextParticleEngine
            text={val ? val.split('\\n') : ''}
            particleColor={['96, 165, 250', '52, 211, 153', '244, 114, 182']}
            particleDensity={0.8}
            isMagnet={true}
          />
        </ParticleCanvas>
      </div>
      <div className="p-4 border-t border-white/10 bg-[#0a0a0a] flex items-center gap-4">
        <span className="text-[11px] font-semibold text-white/40 uppercase tracking-widest whitespace-nowrap">
          Edit Text
        </span>
        <textarea
          rows={2}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Type multiline text... (Press Enter for new line)"
          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 resize-none font-mono placeholder-white/20 transition-all"
        />
      </div>
    </div>
  );
}`;

export default function DynamicInputPage() {
  return (
    <SectionWrapper
      id="dynamic-input"
      title="Dynamic User Input"
      subtitle="Expose real-time controls for users to type and render multiline text as live interactive particles."
    >
      <div className="space-y-8">
        <p className="text-sm text-white/55 leading-relaxed -mt-4">
          By wrapping the <code className="text-violet-300 font-mono text-xs">TextParticleEngine</code> in a state-controlled component, you can feed dynamic text values directly from user input. In this example, we split a standard textarea value by newlines (<code className="text-violet-300 font-mono text-xs">val.split('\n')</code>) to automatically feed an array of lines into the engine, enabling interactive multiline text input in real-time.
        </p>

        {/* Live Demo */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Live Preview</h3>
          <LiveDemo height="360px">
            <DynamicInputExample />
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
