import { createBrowserRouter } from 'react-router-dom';
import PlaygroundPage from './modules/playground/PlaygroundPage';
import DocsLayout from './modules/docs/layout/DocsLayout';
import DocsIndex from './modules/docs/pages/DocsIndex';
import GettingStarted from './modules/docs/pages/GettingStarted';
import Components from './modules/docs/pages/Components';
import Customization from './modules/docs/pages/Customization';
import ApiReference from './modules/docs/pages/ApiReference';
import Hooks from './modules/docs/pages/Hooks';
import Examples from './modules/docs/pages/Examples';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PlaygroundPage />,
    },
    {
        path: '/docs',
        element: <DocsLayout />,
        children: [
            { index: true, element: <DocsIndex /> },
            { path: 'getting-started', element: <GettingStarted /> },
            { path: 'components', element: <Components /> },
            { path: 'customization', element: <Customization /> },
            { path: 'api-reference', element: <ApiReference /> },
            { path: 'hooks', element: <Hooks /> },
            { path: 'examples', element: <Examples /> },
        ],
    },
]);

export default router;
