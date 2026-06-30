import { useState, useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'intro', label: 'Introduction', path: '/' },
  { id: 'install', label: 'Installation', path: '/install' },
  { id: 'quick-start', label: 'Quick Start', path: '/quick-start' },
  {
    id: 'text-particles',
    label: 'Text Particles',
    path: '/text/basic',
    children: [
      { id: 'text-basic', label: 'Basic', path: '/text/basic' },
      { id: 'text-intermediate', label: 'Intermediate', path: '/text/intermediate' },
      { id: 'text-advanced', label: 'Advanced', path: '/text/advanced' },
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
