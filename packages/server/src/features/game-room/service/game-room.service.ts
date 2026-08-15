import type { ClientMessage, ServerMessage } from '@quizzem/shared';
import type { IncomingMessage } from 'node:http';
import type WebSocket from 'ws';
import { QrCodeServices } from '../../qr-code/service/qr-code.service.ts';

async function connectToGameRoom(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (msg.type === 'REQUEST_QR_CODE') {
      const qrCode = await QrCodeServices.generateQR('Hello world!');
      const message: ServerMessage = { type: 'SEND_QR_CODE', payload: { qrCode } };

      ws.send(JSON.stringify(message));
    }
  });
}

export const GameRoomService = { connectToGameRoom };
