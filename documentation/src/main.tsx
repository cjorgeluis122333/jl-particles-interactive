import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';

import IntroPage from './pages/IntroPage';
import InstallPage from './pages/InstallPage';
import QuickStartPage from './pages/QuickStartPage';
import FreeFloatingPage from './pages/text/basic/FreeFloatingPage';
import SimpleTextPage from './pages/text/basic/SimpleTextPage';
import RepelPage from './pages/text/intermediate/RepelPage';
import AttractPage from './pages/text/intermediate/AttractPage';
import ShapesPage from './pages/text/intermediate/ShapesPage';
import CarouselPage from './pages/text/advanced/CarouselPage';
import HeroComboPage from './pages/text/advanced/HeroComboPage';
import LoadingScreenPage from './pages/text/advanced/LoadingScreenPage';
import FollowPointerPage from './pages/backgrounds/FollowPointerPage';
import NetPage from './pages/backgrounds/NetPage';
import JellyfishPage from './pages/backgrounds/JellyfishPage';
import ApiReferencePage from './pages/ApiReferencePage';
import ExamplesPage from './pages/ExamplesPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <IntroPage /> },
        { path: 'install', element: <InstallPage /> },
        { path: 'quick-start', element: <QuickStartPage /> },
        { path: 'text/basic', element: <FreeFloatingPage /> },
        { path: 'text/basic/free-floating', element: <FreeFloatingPage /> },
        { path: 'text/basic/simple-text', element: <SimpleTextPage /> },
        { path: 'text/intermediate', element: <RepelPage /> },
        { path: 'text/intermediate/repel', element: <RepelPage /> },
        { path: 'text/intermediate/attract', element: <AttractPage /> },
        { path: 'text/intermediate/shapes', element: <ShapesPage /> },
        { path: 'text/advanced', element: <CarouselPage /> },
        { path: 'text/advanced/carousel', element: <CarouselPage /> },
        { path: 'text/advanced/hero', element: <HeroComboPage /> },
        { path: 'text/advanced/loading', element: <LoadingScreenPage /> },
        { path: 'backgrounds/follow-pointer', element: <FollowPointerPage /> },
        { path: 'backgrounds/net', element: <NetPage /> },
        { path: 'backgrounds/jellyfish', element: <JellyfishPage /> },
        { path: 'api', element: <ApiReferencePage /> },
        { path: 'examples', element: <ExamplesPage /> },
      ],
    },
  ],
  { basename: '/jl-particles-interactive/docs' }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
