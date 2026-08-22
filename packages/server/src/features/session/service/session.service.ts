import type { ClientMessageOf, Player, ServerMessage, Session } from '@quizzem/shared';
import { randomBytes } from 'node:crypto';
import { networkInterfaces } from 'node:os';
import WebSocket from 'ws';
import { broadcast } from '../../../ws.server.ts';
import { HostService } from '../../host/domain/host.service.ts';
import { PlayerService } from '../../player/domain/player.service.ts';
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
  const { hostId } = clientMessage.payload;

  const host = requireOwnHost(ws, hostId);
  if (!host) return;

  // create a new session
  session.id = randomBytes(3).toString('hex');
  session.host = host;
  session.createdAt = Date.now();
  session.players = [];
  session.state = 'LOBBY';

  await sendJoinInfo(ws);

  broadcastSessionState();
}

// Resolves a host id to the server-side identity, but only if the socket has actually
// identified itself as that host. The id alone is no proof of ownership: it is part of
// every broadcast session state, so any player knows it.
function requireOwnHost(ws: WebSocket, hostId: Player['id']): Player | null {
  const host = HostService.getHost(hostId);

  if (!host || HostService.getHostIdBySocket(ws) !== hostId) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'Only the host can do this.' },
      } satisfies ServerMessage),
    );
    return null;
  }

  return host;
}

// On top of the ownership check: only the host of the *current* session may steer it.
// Without this, a host whose session has since been replaced by another one could still
// control the running session.
function requireSessionHost(ws: WebSocket, hostId: Player['id']): Player | null {
  const host = requireOwnHost(ws, hostId);
  if (!host) return null;

  if (session.host?.id !== host.id) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'Only the host can do this.' },
      } satisfies ServerMessage),
    );
    return null;
  }

  return host;
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
  const { playerId, sessionId } = clientMessage.payload;

  if (sessionId !== session.id) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: "This session doesn't exist (anymore)" },
      } satisfies ServerMessage),
    );
    return;
  }

  // The player has to identify itself via the player feature first – the session only
  // manages the membership, never the identity itself.
  const player = PlayerService.getPlayer(playerId);
  if (!player) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'Unknown player – please join again.' },
      } satisfies ServerMessage),
    );
    return;
  }

  // Reconnect: the player is already a member, so only the socket has to be re-registered
  const isMember = session.players.some((p) => p.id === player.id);
  if (isMember) {
    player.connected = true;
    playersBySocket.set(ws, player.id);

    ws.send(JSON.stringify({ type: 'SESSION:JOINED', payload: { playerId: player.id } } satisfies ServerMessage));
    broadcastSessionState();
    return;
  }

  // Only *new* members are blocked once the quiz is running – the reconnect branch above
  // stays open in every state, so dropping out mid-quiz does not lock a player out.
  if (session.state !== 'LOBBY') {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'The quiz has already started.' },
      } satisfies ServerMessage),
    );
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

  // Stored by reference on purpose: the connection state maintained by the player feature
  // is then part of the broadcast session state without any synchronisation.
  session.players.push(player);

  playersBySocket.set(ws, player.id);
  ws.send(JSON.stringify({ type: 'SESSION:JOINED', payload: { playerId: player.id } } satisfies ServerMessage));
  broadcastSessionState();
}

// Reflects the host’s connection status in the session and notifies everyone of it.
// No comparison against the current value: the host is stored by reference, so the host
// feature has usually already written the new state and a diff would never see a change.
function setHostConnected(hostId: Player['id'], connected: boolean): void {
  if (session.host?.id !== hostId) return;

  session.host.connected = connected;
  broadcastSessionState();
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
  broadcastSessionState();
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

function startSession(ws: WebSocket, clientMessage: ClientMessageOf<'SESSION:START'>): void {
  const { payload } = clientMessage;

  if (!requireSessionHost(ws, payload.hostId)) return;

  if (session.state !== 'LOBBY') {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'The quiz has already been started.' },
      } satisfies ServerMessage),
    );
    return;
  }

  // Disconnected players are ignored on purpose: dropping out clears their ready flag,
  // so a single player leaving the lobby would otherwise block the start for good.
  const presentPlayers = session.players.filter((p) => p.connected);
  if (presentPlayers.length === 0 || !presentPlayers.every((p) => p.ready)) {
    ws.send(
      JSON.stringify({
        type: 'SESSION:ERROR',
        payload: { message: 'All players have to be ready before the quiz can start.' },
      } satisfies ServerMessage),
    );
    return;
  }

  session.state = 'PLAYING';

  broadcastSessionState();
}

function broadcastSessionState(): void {
  broadcast({ type: 'SESSION:STATE', payload: { session } });
}

export const SessionService = {
  createSession,
  joinSession,
  handleDisconnect,
  retrieveSession,
  setHostConnected,
  startSession,
  broadcastSessionState,
};
