import { BookOpen } from 'lucide-react';
import { NAV_ITEMS } from '../App';

interface SidebarProps {
  activeSection: string;
  isOpen: boolean;
  onNavClick: (id: string) => void;
}

export default function Sidebar({ activeSection, isOpen, onNavClick }: SidebarProps) {
  return (
    <aside
      className={`
        fixed left-0 top-0 h-full w-64 z-30 flex flex-col
        bg-[#070710]/95 border-r border-white/10
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 shrink-0">
        <BookOpen size={16} className="text-violet-400 shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">jl-particle-interactive</p>
          <p className="text-[10px] text-white/30">Documentation</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
          On this page
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => onNavClick(id)}
                className={`
                  block px-3 py-2 rounded-md text-sm transition-all duration-150
                  ${activeSection === id
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-white/45 hover:text-white/80 hover:bg-white/5'
                  }
                `}
              >
                {activeSection === id && (
                  <span className="inline-block w-1 h-1 rounded-full bg-violet-400 mr-2 mb-0.5 align-middle" />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer links */}
      <div className="px-6 py-4 border-t border-white/10 shrink-0 flex items-center gap-4">
        <a
          href="https://cjorgeluis122333.github.io/jl-particles-interactive/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
        >
          Demo
        </a>
        <a
          href="https://www.npmjs.com/package/jl-particle-interactive"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
        >
          npm
        </a>
        <a
          href="https://github.com/cjorgeluis122333/jl-particles-interactive"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
        >
          GitHub
        </a>
      </div>
    </aside>
  );
}
