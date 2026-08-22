import type { ClientMessageOf, Player, ServerMessage } from '@quizzem/shared';
import { randomUUID } from 'node:crypto';
import WebSocket from 'ws';

export const playersById = new Map<Player['id'], Player>();
const playerIdBySocket = new Map<WebSocket, Player['id']>();

function createPlayer(ws: WebSocket, clientMessage: ClientMessageOf<'PLAYER:CREATE'>): void {
  const { name } = clientMessage.payload;

  const newPlayer: Player = {
    id: randomUUID(),
    name,
    connected: true,
    ready: false,
  };

  playersById.set(newPlayer.id, newPlayer);
  playerIdBySocket.set(ws, newPlayer.id);

  ws.send(JSON.stringify({ type: 'PLAYER:RETRIEVE', payload: { player: newPlayer } } satisfies ServerMessage));
}

function retrievePlayer(ws: WebSocket, clientMessage: ClientMessageOf<'PLAYER:RETRIEVE'>): void {
  const { playerId } = clientMessage.payload;

  const player = playersById.get(playerId);

  if (!player) {
    ws.send(
      JSON.stringify({ type: 'PLAYER:ERROR', payload: { message: 'Player does not exist.' } } satisfies ServerMessage),
    );
    return;
  }

  // Re-registration after a reload or reconnect: assign a new socket
  player.connected = true;
  playerIdBySocket.set(ws, player.id);

  ws.send(JSON.stringify({ type: 'PLAYER:RETRIEVE', payload: { player } } satisfies ServerMessage));
}

// The session stores the very same player object, so it always sees the current connection state.
function getPlayer(playerId: Player['id']): Player | undefined {
  return playersById.get(playerId);
}

// Reports whether the player state actually changed, so the caller can broadcast it.
function handleDisconnect(ws: WebSocket): boolean {
  const playerId = playerIdBySocket.get(ws);
  playerIdBySocket.delete(ws);
  if (!playerId) return false;

  // The player may already be back via a new socket
  if ([...playerIdBySocket.values()].includes(playerId)) return false;

  const player = playersById.get(playerId);
  if (!player) return false;

  player.connected = false;
  player.ready = false;
  return true;
}

// Reports whether the ready state actually changed, so the caller can broadcast it.
// Returning instead of broadcasting keeps this feature free of a session import – the
// api layer owns the wiring, so the domain dependency stays one-way (session -> player).
function readyPlayer(
  ws: WebSocket,
  clientMessage: ClientMessageOf<'PLAYER:SET_READY'> | ClientMessageOf<'PLAYER:SET_NOT_READY'>,
): boolean {
  const { payload, type } = clientMessage;

  // A socket may only change the ready state of the player it identified itself as –
  // otherwise anyone could ready up the rest of the lobby and have the quiz started.
  if (playerIdBySocket.get(ws) !== payload.playerId) {
    ws.send(
      JSON.stringify({
        type: 'PLAYER:ERROR',
        payload: { message: 'You can only change your own ready state.' },
      } satisfies ServerMessage),
    );
    return false;
  }

  const player = playersById.get(payload.playerId);
  if (!player) {
    ws.send(
      JSON.stringify({
        type: 'PLAYER:ERROR',
        payload: { message: 'Player does not exist.' },
      } satisfies ServerMessage),
    );
    return false;
  }

  player.ready = type === 'PLAYER:SET_READY';
  return true;
}

export const PlayerService = { retrievePlayer, createPlayer, getPlayer, handleDisconnect, readyPlayer };
