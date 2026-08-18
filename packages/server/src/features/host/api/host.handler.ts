import type { IncomingMessage } from 'node:http';
import WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';
import { HostService } from '../domain/host.service.ts';

export async function HostHandler(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    const clientMessage = WsParser.parseClientMessage(raw);
    if (!clientMessage) return;

    try {
      switch (clientMessage.type) {
        case 'HOST:CREATE':
          HostService.createHost(ws, clientMessage);
          break;
        case 'HOST:RETRIEVE':
          HostService.retrieveHost(ws, clientMessage);
          break;
      }
    } catch (err) {
      console.error('[ws] handler failed', err);
    }
  });
}

function handleDisconnect(ws: WebSocket): void {
  HostService.handleDisconnect(ws);
}

HostHandler.handleDisconnect = handleDisconnect;
