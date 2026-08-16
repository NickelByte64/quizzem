import { createBrowserRouter } from 'react-router';
import { Root } from '../components/global/root';
import { HostPage } from '../features/host/host.page';
import { PlayPage } from '../features/play/play.page';

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        element: <>Home page</>,
      },
      {
        path: 'host',
        Component: HostPage,
      },
      {
        path: 'play/:id',
        Component: PlayPage,
      },
    ],
  },
]);
