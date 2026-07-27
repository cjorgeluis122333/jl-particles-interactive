import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import TextPlayground from './components/TextPlayground';
import BackgroundPlayground from './components/BackgroundPlayground';

type Tab = 'text' | 'background';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('text');

  return (
    <div className="fixed inset-0 bg-black">
      {/* Active playground */}
      {activeTab === 'text' && <TextPlayground />}
      {activeTab === 'background' && <BackgroundPlayground />}

      {/* Tab switcher (top-left) */}
      <div className="fixed top-4 left-4 z-20 flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'text'
              ? 'text-white bg-white/15'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          Text
        </button>
        <button
          onClick={() => setActiveTab('background')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'background'
              ? 'text-white bg-white/15'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          Background
        </button>
      </div>

      {/* Links (top-right) */}
      <div className="fixed top-4 right-4 z-20 flex items-center gap-3">
        <a
          href="https://www.npmjs.com/package/jl-particle-interactive"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors"
          title="npm"
        >
          <ExternalLink size={18} />
        </a>
        <a
          href="https://github.com/cjorgeluis122333/jl-particles-interactive"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors"
          title="GitHub"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </div>
    </div>
  );
}
