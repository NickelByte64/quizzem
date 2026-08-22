import type { IncomingMessage } from 'node:http';
import WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';
import { SessionService } from '../../session/service/session.service.ts';
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
        case 'HOST:RETRIEVE': {
          // The api layer wires the two features together – that keeps the domain
          // dependency one-way (session -> host) and free of import cycles.
          const host = HostService.retrieveHost(ws, clientMessage);
          if (host) SessionService.setHostConnected(host.id, true);
          break;
        }
      }
    } catch (err) {
      console.error('[ws] handler failed', err);
    }
  });
}

function handleDisconnect(ws: WebSocket): void {
  const hostId = HostService.handleDisconnect(ws);
  if (hostId) SessionService.setHostConnected(hostId, false);
}

HostHandler.handleDisconnect = handleDisconnect;
