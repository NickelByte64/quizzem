import type { ClientMessageOf, Player, ServerMessage, Session } from '@quizzem/shared';
import { randomBytes, randomUUID } from 'node:crypto';
import { networkInterfaces } from 'node:os';
import WebSocket from 'ws';
import { broadcast } from '../../../ws.server.ts';
import { QrCodeServices } from '../../qr-code/service/qr-code.service.ts';

let session: Session = {
  id: '',
  state: 'LOBBY',
  host: null,
  players: [],
  createdAt: Date.now(),
};

export const playersBySocket = new Map<WebSocket, Player['id']>();

async function createSession(ws: WebSocket, clientMessage: ClientMessageOf<'SESSION:CREATE'>): Promise<void> {
  const { host } = clientMessage.payload;

  // create a new session
  session.id = randomBytes(4).toString('hex');
  session.host = host;
  session.createdAt = Date.now();
  session.players = [];

  await sendJoinInfo(ws);

  broadcast({ type: 'SESSION:STATE', payload: { session } });
}

async function retrieveSession(ws: WebSocket, clientMessage: ClientMessageOf<'SESSION:RETRIEVE'>): Promise<void> {
  const { sessionId } = clientMessage.payload;

  if (sessionId !== session.id) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'This session does not exist anymore.' },
      } satisfies ServerMessage),
    );
    return;
  }

  ws.send(JSON.stringify({ type: 'SESSION:STATE', payload: { session } } satisfies ServerMessage));
  await sendJoinInfo(ws);
}

function joinSession(ws: WebSocket, clientMessage: ClientMessageOf<'SESSION:JOIN'>): void {
  const { player, playerId, sessionId } = clientMessage.payload;

  if (sessionId !== session.id) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: "This session doesn't exist (anymore)" },
      } satisfies ServerMessage),
    );
    return;
  }

  // reconnect if ID is known
  const existingPlayer = playerId ? session.players.find((p) => p.id === playerId) : undefined;
  if (existingPlayer) {
    existingPlayer.connected = true;
    existingPlayer.name = player.name;
    playersBySocket.set(ws, existingPlayer.id);

    ws.send(
      JSON.stringify({
        type: 'SESSION:JOINED',
        payload: { playerId: existingPlayer.id },
      } satisfies ServerMessage),
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
  ws.send(
    JSON.stringify({
      type: 'SESSION:JOINED',
      payload: { playerId: newPlayer.id },
    } satisfies ServerMessage),
  );
  broadcast({ type: 'SESSION:STATE', payload: { session } });
}

// Reflects the host’s connection status in the session and notifies everyone of it.
function setHostConnected(hostId: Player['id'], connected: boolean): void {
  if (session.host?.id !== hostId) return;
  if (session.host.connected === connected) return;

  session.host.connected = connected;
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

function buildJoinUrl(sessionId: string): string {
  const address = Object.values(networkInterfaces())
    .flat()
    .find((ni) => ni?.family === 'IPv4' && !ni.internal)?.address;
  if (!address) throw new Error('No ipv4 found');

  return `http://${address}:3000/play/${sessionId}`;
}

async function sendJoinInfo(ws: WebSocket): Promise<void> {
  const joinUrl = buildJoinUrl(session.id);
  const qrCode = await QrCodeServices.generateQR(joinUrl);
  if (!qrCode) return;

  ws.send(
    JSON.stringify({ type: 'SESSION:JOIN_INFO', payload: { qrCode, plainUrl: joinUrl } } satisfies ServerMessage),
  );
}

export const SessionService = { createSession, joinSession, handleDisconnect, retrieveSession, setHostConnected };
