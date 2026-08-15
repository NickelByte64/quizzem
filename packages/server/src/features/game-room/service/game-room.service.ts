import type { ServerMessage } from '@quizzem/shared';
import type { IncomingMessage } from 'node:http';
import type WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';
import { QrCodeServices } from '../../qr-code/service/qr-code.service.ts';

async function createGameRoom(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    const clientMessage = WsParser.parseClientMessage(raw);

    if (clientMessage.type === 'GAME_ROOM:CREATE') {
      console.log('create room');
    }
  });
}

async function connectToGameRoom(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    const clientMessage = WsParser.parseClientMessage(raw);

    if (clientMessage.type === 'QR_CODE:REQUEST') {
      const qrCode = await QrCodeServices.generateQR('Hello world!');
      const message: ServerMessage = { type: 'QR_CODE:SEND', payload: { qrCode } };

      ws.send(JSON.stringify(message));
    }
  });
}

export const GameRoomService = { connectToGameRoom, createGameRoom };
