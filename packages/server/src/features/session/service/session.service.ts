import type { ClientMessageOf, Player, ServerMessage, Session } from '@quizzem/shared';
import { randomUUID } from 'node:crypto';
import { networkInterfaces } from 'node:os';
import WebSocket from 'ws';
import { broadcast } from '../../../ws.server.ts';
import { QrCodeServices } from '../../qr-code/service/qr-code.service.ts';

const session: Session = {
  id: 'kq7x',
  state: 'LOBBY',
  players: [],
  createdAt: Date.now(),
};

async function createSession(ws: WebSocket) {
  const address = Object.values(networkInterfaces())
    .flat()
    .find((ni) => ni?.family === 'IPv4' && !ni.internal)?.address;
  if (!address) throw new Error('No ipv4 found');

  const joinUrl = `http://${address}:3000/play/${session.id}`;

  const qrCode = await QrCodeServices.generateQR(joinUrl);
  if (!qrCode) return;

  const qrMessage: ServerMessage = { type: 'SESSION:CREATE', payload: { qrCode } };
  ws.send(JSON.stringify(qrMessage));

  const sessionStateMessage: ServerMessage = { type: 'SESSION:STATE', payload: { session } };
  broadcast(sessionStateMessage);
}

async function joinSession(ws: WebSocket, clientMessage: ClientMessageOf<'SESSION:JOIN'>) {
  const playerName = clientMessage.payload.player.name;

  const playerIsInSession = session.players.map((sessionPlayer) => sessionPlayer.name).includes(playerName);
  if (playerIsInSession) {
    console.log(`player ${playerName} is already in session`);
    return;
  }

  const playerId = randomUUID();
  const playerIdMessage: ServerMessage = { type: 'SESSION:JOINED', payload: { playerId } };
  ws.send(JSON.stringify(playerIdMessage));

  const newPlayer: Player = {
    id: playerId,
    name: playerName,
    connected: true,
  };

  session.players.push(newPlayer);

  const message: ServerMessage = { type: 'SESSION:STATE', payload: { session } };
  broadcast(message);
}

export const SessionService = { createSession, joinSession };
