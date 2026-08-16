import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type JSX } from 'react';
import { RouterProvider } from 'react-router';
import { QUERY_CLIENT } from './api/query-client';
import { WebSocketProvider } from './contexts/web-socket/web-socket.context';
import { ROUTER } from './lib/router';

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <WebSocketProvider>
        <RouterProvider router={ROUTER} />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left" />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

