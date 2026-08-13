import { type ServerMessage } from '@quizzem/shared';
import { useEffect, useState, type JSX } from 'react';

const ws = new WebSocket(`ws://${window.location.host}/ws`);

export function App(): JSX.Element {
  const [serverTime, setServerTime] = useState<number | null>(null);

  useEffect(() => {
    ws.onopen = (event) => {
      console.log('WebSocket connection established on client side');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received:', data);

      const message = JSON.parse(event.data) as ServerMessage;
      if (message.type === 'clock') {
        setServerTime(message.payload.now);
      }
    };
  }, []);

  return <div>{serverTime ? new Date(serverTime).toLocaleTimeString() : 'Loading...'}</div>;
}

