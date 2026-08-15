import type { IncomingMessage } from 'node:http';
import type WebSocket from 'ws';
import { GameRoomService } from '../service/game-room.service.ts';

async function connectToGameRoom(ws: WebSocket, req: IncomingMessage): Promise<void> {
  await GameRoomService.connectToGameRoom(ws, req);
}

export const GameRoomHandler = { connectToGameRoom };
