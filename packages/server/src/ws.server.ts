import { type SocketServerClockData } from '@quizzem/shared';
import { WebSocket, WebSocketServer } from 'ws';
import { server } from './http.server.ts';

const wss = new WebSocketServer({ server, path: '/ws' });

const displayHeartbeat = false;

export function startWebSocketServer() {
  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection established on server side for', req.socket.remoteAddress);
    ws.isAlive = true;

    ws.on('pong', () => {
      ws.isAlive = true;
      displayHeartbeat && console.log('[heartbeat] pong received');
    });
  });

  // Broadcast the current time to all connected clients every second
  setInterval(() => {
    const payload: SocketServerClockData = { type: 'CLOCK', payload: { now: Date.now() } };
    const message = JSON.stringify(payload);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }, 1_000);
}

const heartbeat = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      displayHeartbeat && console.log('[heartbeat] no pong since last ping – terminating');
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
    displayHeartbeat && console.log('[heartbeat] ping sent');
  });
}, 30_000);

wss.on('close', () => clearInterval(heartbeat));

wss.on('error', console.error);
