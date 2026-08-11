import { WebSocketServer } from 'ws';
import { server } from './http.server.ts';

export const wss = new WebSocketServer({ server, path: '/ws' });
