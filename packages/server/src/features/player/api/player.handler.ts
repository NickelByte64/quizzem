import type { IncomingMessage } from 'node:http';
import WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';
import { SessionService } from '../../session/service/session.service.ts';
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
        case 'PLAYER:SET_READY':
        case 'PLAYER:SET_NOT_READY':
          // The api layer publishes the change – that keeps the domain dependency
          // one-way (session -> player) and free of import cycles.
          if (PlayerService.readyPlayer(ws, clientMessage)) SessionService.broadcastSessionState();
          break;
      }
    } catch (err) {
      console.error('[ws] handler failed', err);
    }
  });
}

function handleDisconnect(ws: WebSocket): void {
  // Must be published as well: dropping out clears the ready flag, and the session
  // broadcast has already happened by the time this runs.
  if (PlayerService.handleDisconnect(ws)) SessionService.broadcastSessionState();
}

PlayerHandler.handleDisconnect = handleDisconnect;
