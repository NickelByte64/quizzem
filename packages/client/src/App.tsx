import { useEffect, type JSX } from 'react';

const ws = new WebSocket(`ws://${window.location.host}/ws`);

export function App(): JSX.Element {
  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('WebSocket connection established on client side');
    });
  }, []);

  return <div>App</div>;
}

