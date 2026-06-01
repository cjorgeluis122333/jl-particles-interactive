import { Link } from 'react-router-dom';
import { Book, Code, Zap, Palette, Settings } from 'lucide-react';

const documentationSections = [
    {
        path: '/docs/getting-started',
        title: 'Getting Started',
        description: 'Introduction to JL Particles Interactive and basic setup',
        icon: Zap,
    },
    {
        path: '/docs/components',
        title: 'Components',
        description: 'Learn about ParticleCanvas and TextParticleEngine',
        icon: Code,
    },
    {
        path: '/docs/customization',
        title: 'Customization',
        description: 'Customize particles, shapes, colors, and interactions',
        icon: Palette,
    },
    {
        path: '/docs/api-reference',
        title: 'API Reference',
        description: 'Complete API documentation and type definitions',
        icon: Book,
    },
    {
        path: '/docs/hooks',
        title: 'Hooks',
        description: 'useParticleInteraction and useTextParticles hooks',
        icon: Settings,
    },
    {
        path: '/docs/examples',
        title: 'Examples',
        description: 'Code examples and interactive demos',
        icon: Code,
    },
];

export default function DocsIndex() {
    return (
        <div>
            {/* Intro Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Documentation</h2>
                <p className="text-white/60 text-lg max-w-3xl">
                    Explore our comprehensive guide to understand and master JL Particles Interactive.
                    Select a topic below to get started.
                </p>
            </div>

            {/* Documentation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentationSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                        <Link
                            key={section.path}
                            to={section.path}
                            className="group text-left p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                                    <IconComponent size={24} className="text-white" />
                                </div>
                                <span className="text-white/30 group-hover:text-white/50 transition-all duration-300">→</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-all">
                                {section.title}
                            </h3>
                            <p className="text-white/50 text-sm group-hover:text-white/60 transition-all">
                                {section.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
