import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from './Sidebar';

export default function DocsLayout() {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#050505] to-[#0f0f0f] overflow-y-auto flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 flex items-center justify-center"
                            title="Back to playground"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white">JL Particles Interactive</h1>
                            <p className="text-white/50 text-sm">Documentation</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Body: Sidebar + Content */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 flex gap-10">
                <Sidebar />
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
