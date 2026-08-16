import { type ServerMessage } from '@quizzem/shared';
import { WebSocket, WebSocketServer } from 'ws';
import { GameRoomHandler } from './features/game-room/api/game-room.handler.ts';
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

    await GameRoomHandler(ws, req);
    await SessionHandler(ws, req);

    ws.on('close', () => {
      SessionHandler.handleDisconnect(ws);
    });
  });

  // Broadcast the current time to all connected clients every second
  setInterval(() => {
    const message: ServerMessage = { type: 'CLOCK', payload: { now: Date.now() } };
    broadcast(message);
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
