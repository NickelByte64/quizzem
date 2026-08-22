import { type ServerMessage } from '@quizzem/shared';
import { WebSocket, WebSocketServer } from 'ws';
import { HostHandler } from './features/host/api/host.handler.ts';
import { PlayerHandler } from './features/player/api/player.handler.ts';
import { SessionHandler } from './features/session/api/session.handler.ts';
import { server } from './http.server.ts';

export const wss = new WebSocketServer({ server, path: '/ws' });

const displayHeartbeat = false;

export function broadcast(message: ServerMessage): void {
  const raw = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(raw);
  });
}

export function startWebSocketServer() {
  wss.on('connection', async (ws, req) => {
    console.log('New WebSocket connection established on server side for', req.socket.remoteAddress);
    ws.isAlive = true;

    ws.on('pong', () => {
      ws.isAlive = true;
      displayHeartbeat && console.log('[heartbeat] pong received');
    });

    await HostHandler(ws, req);
    await SessionHandler(ws, req);
    await PlayerHandler(ws, req);

    ws.on('close', () => {
      SessionHandler.handleDisconnect(ws);
      HostHandler.handleDisconnect(ws);
      PlayerHandler.handleDisconnect(ws);
    });
  });
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
