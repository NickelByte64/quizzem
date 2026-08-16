import type { IncomingMessage } from 'node:http';
import WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';
import { SessionService } from '../service/session.service.ts';

export async function SessionHandler(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    const clientMessage = WsParser.parseClientMessage(raw);
    if (!clientMessage) return;

    try {
      switch (clientMessage.type) {
        case 'SESSION:REQUEST':
          await SessionService.createSession(ws);
          break;
        case 'SESSION:JOIN':
          await SessionService.joinSession(ws, clientMessage);
          break;
      }
    } catch (err) {
      console.error('[ws] handler failed', err);
    }
  });
}

async function handleDisconnect(ws: WebSocket) {
  SessionService.handleDisconnect(ws);
}

SessionHandler.handleDisconnect = handleDisconnect;
