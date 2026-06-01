import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExampleShellProps {
  number: number;
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
  height?: string;
}

export default function ExampleShell({
  number,
  title,
  description,
  code,
  children,
  height = '40vh',
}: ExampleShellProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden hover:border-white/20 transition-colors">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white">
              #{number.toString().padStart(2, '0')} — {title}
            </h3>
            <p className="text-sm text-white/60 mt-1">{description}</p>
          </div>
        </div>
      </div>

      {/* Canvas / Component Preview */}
      <div style={{ height }} className="relative bg-black/50 overflow-hidden">
        {children}
      </div>

      {/* Code Toggle & Display */}
      <div className="border-t border-white/10">
        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full px-6 py-3 flex items-center gap-2 hover:bg-white/5 transition-colors text-sm text-white/80 font-medium"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${showCode ? 'rotate-180' : ''}`}
          />
          {showCode ? 'Hide' : 'Show'} Code
        </button>

        {showCode && (
          <div className="px-6 py-4 bg-black/70 border-t border-white/10">
            <pre className="bg-black/50 rounded p-4 overflow-x-auto text-xs text-green-400 font-mono border border-white/5">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
