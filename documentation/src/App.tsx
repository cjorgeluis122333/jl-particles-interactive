import { useState, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  sections?: {
    id: string;
    title: string;
    items: { id: string; label: string; path: string }[];
  }[];
  children?: { id: string; label: string; path: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'intro', label: 'Introduction', path: '/' },
  { id: 'install', label: 'Installation', path: '/install' },
  { id: 'quick-start', label: 'Quick Start', path: '/quick-start' },
  {
    id: 'text-particles',
    label: 'Text Particles',
    path: '/text/basic/free-floating',
    sections: [
      {
        id: 'basic',
        title: 'Basic',
        items: [
          { id: 'text-free-floating', label: 'Free-floating Ambient', path: '/text/basic/free-floating' },
          { id: 'text-simple-text', label: 'Simple Text Rendering', path: '/text/basic/simple-text' },
          { id: 'text-multiline', label: 'Multiline Text Rendering', path: '/text/basic/multiline' },
        ],
      },
      {
        id: 'intermediate',
        title: 'Intermediate',
        items: [
          { id: 'text-repel', label: 'Magnetic Hover + Repel', path: '/text/intermediate/repel' },
          { id: 'text-attract', label: 'Click Attract', path: '/text/intermediate/attract' },
          { id: 'text-shapes', label: 'Particle Shapes', path: '/text/intermediate/shapes' },
          { id: 'text-dynamic-input', label: 'Dynamic User Input', path: '/text/intermediate/dynamic-input' },
        ],
      },
      {
        id: 'advanced',
        title: 'Advanced',
        items: [
          { id: 'text-carousel', label: 'Word Carousel', path: '/text/advanced/carousel' },
          { id: 'text-multiline-carousel', label: 'Multiline Quote Carousel', path: '/text/advanced/multiline-carousel' },
          { id: 'text-hero-combo', label: 'Text + Background Combo', path: '/text/advanced/hero' },
        ],
      },
    ],
  },
  {
    id: 'backgrounds',
    label: 'Backgrounds',
    path: '/backgrounds/follow-pointer',
    children: [
      { id: 'bg-follow-pointer', label: 'Follow Pointer', path: '/backgrounds/follow-pointer' },
      { id: 'bg-net', label: 'Net', path: '/backgrounds/net' },
      { id: 'bg-jellyfish', label: 'Jellyfish', path: '/backgrounds/jellyfish' },
    ],
  },
  { id: 'api', label: 'API Reference', path: '/api' },
  { id: 'examples', label: 'Examples', path: '/examples' },
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#070710] text-white">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onNavClick={handleNavClick}
      />

      <div className="lg:pl-64">
        <Navbar onMenuClick={() => setIsSidebarOpen(prev => !prev)} />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
