import type { ClockData } from '@quizzem/shared';
import { useState, type JSX } from 'react';
import { useWebSocket } from './lib/useWebSocket';

export function App(): JSX.Element {
  const [serverTime, setServerTime] = useState<number | null>(null);

  useWebSocket<ClockData>({
    onMessage: (data) => {
      if (data.type === 'CLOCK') setServerTime(data.payload.now);
    },
  });

  return <div>{serverTime ? new Date(serverTime).toLocaleTimeString() : 'Loading...'}</div>;
}

