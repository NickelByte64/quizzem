import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type JSX } from 'react';
import { QUERY_CLIENT } from './api/query-client';
import { WebSocketProvider } from './contexts/web-socket/web-socket.context';
import { HostPage } from './features/host/host.page';

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <WebSocketProvider>
        <HostPage />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" buttonPosition="bottom-left" />
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

