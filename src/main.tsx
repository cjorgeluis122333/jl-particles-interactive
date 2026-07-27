import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from '../documentation/src/App';

import IntroPage from '../documentation/src/pages/IntroPage';
import InstallPage from '../documentation/src/pages/InstallPage';
import QuickStartPage from '../documentation/src/pages/QuickStartPage';
import FreeFloatingPage from '../documentation/src/pages/text/basic/FreeFloatingPage';
import SimpleTextPage from '../documentation/src/pages/text/basic/SimpleTextPage';
import RepelPage from '../documentation/src/pages/text/intermediate/RepelPage';
import AttractPage from '../documentation/src/pages/text/intermediate/AttractPage';
import ShapesPage from '../documentation/src/pages/text/intermediate/ShapesPage';
import CarouselPage from '../documentation/src/pages/text/advanced/CarouselPage';
import HeroComboPage from '../documentation/src/pages/text/advanced/HeroComboPage';
import LoadingScreenPage from '../documentation/src/pages/text/advanced/LoadingScreenPage';
import FollowPointerPage from '../documentation/src/pages/backgrounds/FollowPointerPage';
import NetPage from '../documentation/src/pages/backgrounds/NetPage';
import JellyfishPage from '../documentation/src/pages/backgrounds/JellyfishPage';
import ApiReferencePage from '../documentation/src/pages/ApiReferencePage';
import ExamplesPage from '../documentation/src/pages/ExamplesPage';

import DemoApp from '../demo/src/App';

const router = createBrowserRouter([
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
      { path: '*', element: <IntroPage /> },
    ],
  },
  {
    path: '/demo',
    element: <DemoApp />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
