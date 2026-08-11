import { WebSocketServer } from 'ws';
import { server } from './http.server.ts';

export const wss = new WebSocketServer({ server, path: '/ws' });

// Broadcast the current time to all connected clients every second
setInterval(() => {
  const message = JSON.stringify({ type: 'clock', payload: { now: Date.now() } });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}, 1_000);
