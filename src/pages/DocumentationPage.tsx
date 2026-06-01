import { ArrowLeft, Book, Code, Zap, Palette, Settings } from 'lucide-react';

interface DocumentationPageProps {
    onBack: () => void;
}

export default function DocumentationPage({ onBack }: DocumentationPageProps) {
    const documentationSections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            description: 'Introduction to JL Particles Interactive and basic setup',
            icon: Zap,
        },
        {
            id: 'components',
            title: 'Components',
            description: 'Learn about ParticleCanvas and TextParticleEngine',
            icon: Code,
        },
        {
            id: 'customization',
            title: 'Customization',
            description: 'Customize particles, shapes, colors, and interactions',
            icon: Palette,
        },
        {
            id: 'api-reference',
            title: 'API Reference',
            description: 'Complete API documentation and type definitions',
            icon: Book,
        },
        {
            id: 'hooks',
            title: 'Hooks',
            description: 'useParticleInteraction and useTextParticles hooks',
            icon: Settings,
        },
        {
            id: 'examples',
            title: 'Examples',
            description: 'Code examples and interactive demos',
            icon: Code,
        },
    ];

    const handleSectionClick = (sectionId: string) => {
        console.log(`Navigating to: ${sectionId}`);
        // TODO: Implement navigation to individual documentation sections
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#050505] to-[#0f0f0f] overflow-y-auto flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 flex items-center justify-center"
                            title="Back to main"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white">JL Particles Interactive</h1>
                            <p className="text-white/50 text-sm">Documentation Dashboard</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
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
                            <button
                                key={section.id}
                                onClick={() => handleSectionClick(section.id)}
                                className="group text-left p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 cursor-pointer"
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
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-20 pt-12 border-t border-white/10">
                    <p className="text-white/40 text-center text-sm">
                        Documentation is under construction. Check back soon for more content.
                    </p>
                </div>
            </main>
        </div>
    );
}
