import { NavLink } from 'react-router-dom';
import { Zap, Code, Palette, Book, Settings, Type, Monitor } from 'lucide-react';

const sections = [
    { path: '/docs', label: 'Overview', icon: Book, end: true },
    { path: '/docs/getting-started', label: 'Getting Started', icon: Zap, end: false },
    { path: '/docs/components', label: 'Components', icon: Code, end: false },
    { path: '/docs/customization', label: 'Customization', icon: Palette, end: false },
    { path: '/docs/api-reference', label: 'API Reference', icon: Book, end: false },
    { path: '/docs/hooks', label: 'Hooks', icon: Settings, end: false },
    { path: '/docs/examples/text', label: 'Text Samples', icon: Type, end: false },
    { path: '/docs/examples/canvas', label: 'Canvas Samples', icon: Monitor, end: false },
];

export default function Sidebar() {
    return (
        <nav className="w-64 shrink-0 flex flex-col gap-1 pr-4">
            <p className="text-[10px] uppercase tracking-widest text-white/30 font-sans mb-2 px-3">Documentation</p>
            {sections.map(({ path, label, icon: Icon, end }) => (
                <NavLink
                    key={path}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-all duration-200 ${
                            isActive
                                ? 'bg-white/10 text-white border border-white/15'
                                : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
                        }`
                    }
                >
                    <Icon size={16} className="shrink-0" />
                    {label}
                </NavLink>
            ))}
        </nav>
    );
}
