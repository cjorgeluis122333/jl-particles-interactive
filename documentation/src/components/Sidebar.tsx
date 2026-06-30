import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen, ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '../App';

interface SidebarProps {
  isOpen: boolean;
  onNavClick: (id: string) => void;
}

export default function Sidebar({ isOpen, onNavClick }: SidebarProps) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'text-particles': true,
    'backgrounds': true,
  });

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isGroupActive = (item: typeof NAV_ITEMS[number]) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return location.pathname === item.path;
  };

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
          Navigation
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              const groupActive = isGroupActive(item);
              const isExpanded = expandedGroups[item.id] ?? groupActive;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-150
                      ${groupActive
                        ? 'text-white font-medium'
                        : 'text-white/45 hover:text-white/80 hover:bg-white/5'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      {groupActive && (
                        <span className="inline-block w-1 h-1 rounded-full bg-violet-400" />
                      )}
                      {item.label}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-white/30 transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                  </button>
                  {isExpanded && (
                    <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-white/8 pl-2">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <NavLink
                            to={child.path}
                            onClick={() => onNavClick(child.id)}
                            className={({ isActive }) => `
                              block px-3 py-1.5 rounded-md text-[13px] transition-all duration-150
                              ${isActive
                                ? 'bg-white/10 text-white font-medium'
                                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                              }
                            `}
                          >
                            {({ isActive }) => (
                              <>
                                {isActive && (
                                  <span className="inline-block w-1 h-1 rounded-full bg-violet-400 mr-2 mb-0.5 align-middle" />
                                )}
                                {child.label}
                              </>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={() => onNavClick(item.id)}
                  end={item.path === '/'}
                  className={({ isActive }) => `
                    block px-3 py-2 rounded-md text-sm transition-all duration-150
                    ${isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/45 hover:text-white/80 hover:bg-white/5'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="inline-block w-1 h-1 rounded-full bg-violet-400 mr-2 mb-0.5 align-middle" />
                      )}
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
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
