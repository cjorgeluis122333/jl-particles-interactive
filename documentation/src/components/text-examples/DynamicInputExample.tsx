import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function DynamicInputExample() {
  const [val, setVal] = useState("Write\nSomething");

  return (
    <div className="flex flex-col h-full bg-[#050505]">
      <div className="flex-1 relative min-h-[260px]">
        <ParticleCanvas height="100%" backgroundColor="transparent">
          <TextParticleEngine
            text={val ? val.split('\n') : ''}
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
}
