import type { ClientMessageOf, Player, ServerMessage } from '@quizzem/shared';
import { randomUUID } from 'node:crypto';
import WebSocket from 'ws';
import { SessionService } from '../../session/service/session.service.ts';

export const hostsById = new Map<Player['id'], Player>();
const hostIdBySocket = new Map<WebSocket, Player['id']>();

function createHost(ws: WebSocket, clientMessage: ClientMessageOf<'HOST:CREATE'>): void {
  const { name } = clientMessage.payload;

  const newHost: Player = {
    id: randomUUID(),
    name,
    connected: true,
  };

  hostsById.set(newHost.id, newHost);
  hostIdBySocket.set(ws, newHost.id);

  const hostMessage: ServerMessage = { type: 'HOST:RETRIEVE', payload: { host: newHost } };
  ws.send(JSON.stringify(hostMessage));
}

function retrieveHost(ws: WebSocket, clientMessage: ClientMessageOf<'HOST:RETRIEVE'>): void {
  const { hostId } = clientMessage.payload;

  const host = hostsById.get(hostId);

  if (!host) {
    const hostMessage: ServerMessage = { type: 'HOST:ERROR', payload: { message: 'Host does not exist.' } };
    ws.send(JSON.stringify(hostMessage));
    return;
  }

  // Re-registration after a reload or reconnect: assign a new socket
  host.connected = true;
  hostIdBySocket.set(ws, host.id);
  SessionService.setHostConnected(host.id, true);

  const hostMessage: ServerMessage = { type: 'HOST:RETRIEVE', payload: { host } };
  ws.send(JSON.stringify(hostMessage));
}

function handleDisconnect(ws: WebSocket): void {
  const hostId = hostIdBySocket.get(ws);
  hostIdBySocket.delete(ws);
  if (!hostId) return;

  // The host may already be back via a new socket
  if ([...hostIdBySocket.values()].includes(hostId)) return;

  const host = hostsById.get(hostId);
  if (host) host.connected = false;

  SessionService.setHostConnected(hostId, false);
}

export const HostService = { createHost, retrieveHost, handleDisconnect };
