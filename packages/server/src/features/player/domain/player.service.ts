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

function handleDisconnect(ws: WebSocket): void {
  const playerId = playerIdBySocket.get(ws);
  playerIdBySocket.delete(ws);
  if (!playerId) return;

  // The player may already be back via a new socket
  if ([...playerIdBySocket.values()].includes(playerId)) return;

  const player = playersById.get(playerId);
  if (player) player.connected = false;
}

export const PlayerService = { retrievePlayer, createPlayer, getPlayer, handleDisconnect };
