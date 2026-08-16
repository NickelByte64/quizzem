import type { IncomingMessage } from 'node:http';
import type WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';

export async function GameRoomHandler(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    const clientMessage = WsParser.parseClientMessage(raw);
    if (!clientMessage) return;

    try {
      switch (clientMessage.type) {
      }
    } catch (err) {
      console.error('[ws] handler failed', err);
    }
  });
}
