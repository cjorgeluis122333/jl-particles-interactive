import { useState } from 'react';
import { ChevronDown, Play, Pause } from 'lucide-react';

interface ExampleShellProps {
  number: number;
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
  height?: string;
  isActive: boolean;
  onActivate: () => void;
  isPaused?: boolean;
}

export default function ExampleShell({
  number,
  title,
  description,
  code,
  children,
  height = '40vh',
  isActive,
  onActivate,
  isPaused = false,
}: ExampleShellProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div
      className={`rounded-lg border overflow-hidden transition-all ${
        isActive
          ? 'border-green-500/50 bg-green-500/5 shadow-lg shadow-green-500/10'
          : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      {/* Header */}
      <div
        className={`px-6 py-4 border-b transition-colors ${
          isActive
            ? 'border-green-500/20 bg-green-500/[0.03]'
            : 'border-white/10 bg-white/[0.02]'
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              #{number.toString().padStart(2, '0')} — {title}
            </h3>
            <p className="text-sm text-white/60 mt-1">{description}</p>
          </div>

          {/* Activate/Pause Button */}
          <button
            onClick={onActivate}
            className={`ml-4 px-3 py-2 rounded flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? isPaused
                  ? 'bg-yellow-600/30 text-yellow-200 hover:bg-yellow-600/40'
                  : 'bg-green-600/30 text-green-200 hover:bg-green-600/40'
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {isActive ? (
              isPaused ? (
                <>
                  <Play size={14} /> Reanudar
                </>
              ) : (
                <>
                  <Pause size={14} /> Pausa
                </>
              )
            ) : (
              <>
                <Play size={14} /> Ejecutar
              </>
            )}
          </button>
        </div>
      </div>

      {/* Canvas / Component Preview */}
      <div
        style={{ height, opacity: isActive ? 1 : 0.4 }}
        className={`relative bg-black/50 overflow-hidden transition-opacity ${
          !isActive && 'pointer-events-none'
        }`}
      >
        <div className="h-full w-full p-6 pointer-events-none flex items-center justify-center">
          <div className="pointer-events-auto w-full h-full">
            {children}
          </div>
        </div>

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <span className="text-white/40 text-sm font-medium">Pausado</span>
          </div>
        )}
      </div>

      {/* Code Toggle & Display */}
      <div className={`border-t ${isActive ? 'border-green-500/20' : 'border-white/10'}`}>
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
