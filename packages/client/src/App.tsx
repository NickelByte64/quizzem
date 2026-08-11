import { useEffect, useState, type JSX } from 'react';

const ws = new WebSocket(`ws://${window.location.host}/ws`);

type ServerMessage = { type: 'clock'; payload: { now: number } };

export function App(): JSX.Element {
  const [serverTime, setServerTime] = useState<number | null>(null);

  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('WebSocket connection established on client side');
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data) as ServerMessage;
      if (message.type === 'clock') {
        setServerTime(message.payload.now);
      }
    });
  }, []);

  return <div>{serverTime ? new Date(serverTime).toLocaleTimeString() : 'Loading...'}</div>;
}

