import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import DocsApp from './documentation/App';
import DemoApp from './demo/App';

import IntroPage from './documentation/pages/IntroPage';
import InstallPage from './documentation/pages/InstallPage';
import QuickStartPage from './documentation/pages/QuickStartPage';
import FreeFloatingPage from './documentation/pages/text/basic/FreeFloatingPage';
import SimpleTextPage from './documentation/pages/text/basic/SimpleTextPage';
import MultilinePage from './documentation/pages/text/basic/MultilinePage';
import RepelPage from './documentation/pages/text/intermediate/RepelPage';
import AttractPage from './documentation/pages/text/intermediate/AttractPage';
import ShapesPage from './documentation/pages/text/intermediate/ShapesPage';
import DynamicInputPage from './documentation/pages/text/intermediate/DynamicInputPage';
import CarouselPage from './documentation/pages/text/advanced/CarouselPage';
import MultilineCarouselPage from './documentation/pages/text/advanced/MultilineCarouselPage';
import FollowPointerPage from './documentation/pages/backgrounds/FollowPointerPage';
import NetPage from './documentation/pages/backgrounds/NetPage';
import JellyfishPage from './documentation/pages/backgrounds/JellyfishPage';
import ApiReferencePage from './documentation/pages/ApiReferencePage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <DocsApp />,
      children: [
        { index: true, element: <IntroPage /> },
        { path: 'install', element: <InstallPage /> },
        { path: 'quick-start', element: <QuickStartPage /> },
        { path: 'text/basic', element: <FreeFloatingPage /> },
        { path: 'text/basic/free-floating', element: <FreeFloatingPage /> },
        { path: 'text/basic/simple-text', element: <SimpleTextPage /> },
        { path: 'text/basic/multiline', element: <MultilinePage /> },
        { path: 'text/intermediate', element: <RepelPage /> },
        { path: 'text/intermediate/repel', element: <RepelPage /> },
        { path: 'text/intermediate/attract', element: <AttractPage /> },
        { path: 'text/intermediate/shapes', element: <ShapesPage /> },
        { path: 'text/intermediate/dynamic-input', element: <DynamicInputPage /> },
        { path: 'text/advanced', element: <CarouselPage /> },
        { path: 'text/advanced/carousel', element: <CarouselPage /> },
        { path: 'text/advanced/multiline-carousel', element: <MultilineCarouselPage /> },
        { path: 'backgrounds/follow-pointer', element: <FollowPointerPage /> },
        { path: 'backgrounds/net', element: <NetPage /> },
        { path: 'backgrounds/jellyfish', element: <JellyfishPage /> },
        { path: 'api', element: <ApiReferencePage /> },
      ],
    },
    {
      path: '/demo',
      element: <DemoApp />
    }
  ]
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);