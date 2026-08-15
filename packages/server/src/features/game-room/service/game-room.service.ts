import type { ServerMessage } from '@quizzem/shared';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import type { IncomingMessage } from 'node:http';
import type WebSocket from 'ws';
import { knex } from '../../../core/db.ts';
import { WsParser } from '../../../utils/ws.parser.ts';
import { QrCodeServices } from '../../qr-code/service/qr-code.service.ts';

async function getGameRooms(req: Request, res: Response): Promise<Response> {
  const gameRooms = await knex('game_room').select('*');

  return res.json(gameRooms);
}

async function createGameRoom(req: Request, res: Response): Promise<void> {
  // validate the req.body

  // for now just save the content to file
  if (!req.body) throw new Error('Body is required');

  await knex('game_room').insert({ id: randomUUID(), name: req.body.name });

  res.send(200);
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

export const GameRoomService = { connectToGameRoom, createGameRoom, getGameRooms };
