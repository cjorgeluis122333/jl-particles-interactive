import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';

const IntroPage = lazy(() => import('./pages/IntroPage'));
const InstallPage = lazy(() => import('./pages/InstallPage'));
const QuickStartPage = lazy(() => import('./pages/QuickStartPage'));
const TextBasicPage = lazy(() => import('./pages/text/TextBasicPage'));
const TextIntermediatePage = lazy(() => import('./pages/text/TextIntermediatePage'));
const TextAdvancedPage = lazy(() => import('./pages/text/TextAdvancedPage'));
const FollowPointerPage = lazy(() => import('./pages/backgrounds/FollowPointerPage'));
const NetPage = lazy(() => import('./pages/backgrounds/NetPage'));
const JellyfishPage = lazy(() => import('./pages/backgrounds/JellyfishPage'));
const ApiReferencePage = lazy(() => import('./pages/ApiReferencePage'));
const ExamplesPage = lazy(() => import('./pages/ExamplesPage'));

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-5 h-5 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Suspense fallback={<Loading />}><IntroPage /></Suspense> },
        { path: 'install', element: <Suspense fallback={<Loading />}><InstallPage /></Suspense> },
        { path: 'quick-start', element: <Suspense fallback={<Loading />}><QuickStartPage /></Suspense> },
        { path: 'text/basic', element: <Suspense fallback={<Loading />}><TextBasicPage /></Suspense> },
        { path: 'text/intermediate', element: <Suspense fallback={<Loading />}><TextIntermediatePage /></Suspense> },
        { path: 'text/advanced', element: <Suspense fallback={<Loading />}><TextAdvancedPage /></Suspense> },
        { path: 'backgrounds/follow-pointer', element: <Suspense fallback={<Loading />}><FollowPointerPage /></Suspense> },
        { path: 'backgrounds/net', element: <Suspense fallback={<Loading />}><NetPage /></Suspense> },
        { path: 'backgrounds/jellyfish', element: <Suspense fallback={<Loading />}><JellyfishPage /></Suspense> },
        { path: 'api', element: <Suspense fallback={<Loading />}><ApiReferencePage /></Suspense> },
        { path: 'examples', element: <Suspense fallback={<Loading />}><ExamplesPage /></Suspense> },
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
