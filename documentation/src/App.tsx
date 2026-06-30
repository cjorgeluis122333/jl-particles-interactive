import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import IntroSection from './sections/IntroSection';
import InstallSection from './sections/InstallSection';
import QuickStartSection from './sections/QuickStartSection';
import TextParticlesSection from './sections/TextParticlesSection';
import BackgroundModesSection from './sections/BackgroundModesSection';
import ApiReferenceSection from './sections/ApiReferenceSection';
import ExamplesSection from './sections/ExamplesSection';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'install', label: 'Installation' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'text-particles', label: 'Text Particles' },
  { id: 'backgrounds', label: 'Background Modes' },
  { id: 'api', label: 'API Reference' },
  { id: 'examples', label: 'Examples' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Track active section via scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          return;
        }
      }
      setActiveSection(NAV_ITEMS[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#070710] text-white">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        isOpen={isSidebarOpen}
        onNavClick={handleNavClick}
      />

      {/* Main area — offset left for sidebar on desktop */}
      <div className="lg:pl-64">
        <Navbar onMenuClick={() => setIsSidebarOpen(prev => !prev)} />

        <main>
          <IntroSection />
          <InstallSection />
          <QuickStartSection />
          <TextParticlesSection />
          <BackgroundModesSection />
          <ApiReferenceSection />
          <ExamplesSection />
        </main>
      </div>
    </div>
  );
}
