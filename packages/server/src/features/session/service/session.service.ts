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

export const playersBySocket = new Map<WebSocket, Player['id']>();

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
  const { player, playerId } = clientMessage.payload;

  // reconnect if ID is known
  const existingPlayer = playerId ? session.players.find((p) => p.id === playerId) : undefined;
  if (existingPlayer) {
    existingPlayer.connected = true;
    existingPlayer.name = player.name;
    playersBySocket.set(ws, existingPlayer.id);

    ws.send(
      JSON.stringify({ type: 'SESSION:JOINED', payload: { playerId: existingPlayer.id } } satisfies ServerMessage),
    );
    broadcast({ type: 'SESSION:STATE', payload: { session } });
    return;
  }

  const nameTaken = session.players.some((p) => p.name.toLowerCase() === player.name.toLowerCase());
  if (nameTaken) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'Name has already been taken.' },
      } satisfies ServerMessage),
    );
    return;
  }

  const newPlayer: Player = {
    id: randomUUID(),
    name: player.name,
    connected: true,
  };
  session.players.push(newPlayer);

  playersBySocket.set(ws, newPlayer.id);
  ws.send(JSON.stringify({ type: 'SESSION:JOINED', payload: { playerId: newPlayer.id } } satisfies ServerMessage));
  broadcast({ type: 'SESSION:STATE', payload: { session } });
}

function handleDisconnect(ws: WebSocket): void {
  const id = playersBySocket.get(ws);
  playersBySocket.delete(ws);
  if (!id) return;

  // Player might be back through a new Socket
  if ([...playersBySocket.values()].includes(id)) return;

  const player = session.players.find((p) => p.id === id);
  if (!player) return;

  player.connected = false;
  broadcast({ type: 'SESSION:STATE', payload: { session } });
}

export const SessionService = { createSession, joinSession, handleDisconnect };
