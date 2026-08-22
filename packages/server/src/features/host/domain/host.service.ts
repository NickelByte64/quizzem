import type { ClientMessageOf, Player, ServerMessage } from '@quizzem/shared';
import { randomUUID } from 'node:crypto';
import WebSocket from 'ws';

export const hostsById = new Map<Player['id'], Player>();
const hostIdBySocket = new Map<WebSocket, Player['id']>();

function createHost(ws: WebSocket, clientMessage: ClientMessageOf<'HOST:CREATE'>): void {
  const { name } = clientMessage.payload;

  const newHost: Player = {
    id: randomUUID(),
    name,
    connected: true,
    ready: true,
  };

  hostsById.set(newHost.id, newHost);
  hostIdBySocket.set(ws, newHost.id);

  ws.send(JSON.stringify({ type: 'HOST:RETRIEVE', payload: { host: newHost } } satisfies ServerMessage));
}

// Returns the restored host so the caller can reflect the new connection state in the session.
function retrieveHost(ws: WebSocket, clientMessage: ClientMessageOf<'HOST:RETRIEVE'>): Player | null {
  const { hostId } = clientMessage.payload;

  const host = getHost(hostId);

  if (!host) {
    ws.send(
      JSON.stringify({ type: 'HOST:ERROR', payload: { message: 'Host does not exist.' } } satisfies ServerMessage),
    );
    return null;
  }

  // Re-registration after a reload or reconnect: assign a new socket
  host.connected = true;
  hostIdBySocket.set(ws, host.id);

  ws.send(JSON.stringify({ type: 'HOST:RETRIEVE', payload: { host } } satisfies ServerMessage));
  return host;
}

function getHost(hostId: Player['id']): Player | undefined {
  return hostsById.get(hostId);
}

// Which host a socket has identified itself as – the basis for every ownership check.
function getHostIdBySocket(ws: WebSocket): Player['id'] | undefined {
  return hostIdBySocket.get(ws);
}

// Returns the host that actually went offline, so the caller can broadcast the change.
function handleDisconnect(ws: WebSocket): Player['id'] | null {
  const hostId = getHostIdBySocket(ws);
  hostIdBySocket.delete(ws);
  if (!hostId) return null;

  // The host may already be back via a new socket
  if ([...hostIdBySocket.values()].includes(hostId)) return null;

  const host = getHost(hostId);
  if (host) host.connected = false;

  return hostId;
}

export const HostService = { createHost, retrieveHost, getHost, getHostIdBySocket, handleDisconnect };
