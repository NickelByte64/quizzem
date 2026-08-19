import type { IncomingMessage } from 'node:http';
import WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';
import { PlayerService } from '../domain/player.service.ts';

export async function PlayerHandler(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    const clientMessage = WsParser.parseClientMessage(raw);
    if (!clientMessage) return;

    try {
      switch (clientMessage.type) {
        case 'PLAYER:RETRIEVE':
          PlayerService.retrievePlayer(ws, clientMessage);
          break;
        case 'PLAYER:CREATE':
          PlayerService.createPlayer(ws, clientMessage);
          break;
      }
    } catch (err) {
      console.error('[ws] handler failed', err);
    }
  });
}

function handleDisconnect(ws: WebSocket): void {
  PlayerService.handleDisconnect(ws);
}

PlayerHandler.handleDisconnect = handleDisconnect;
