import type { UUID } from 'node:crypto';
import type { Session } from './session.types.ts';

// ---- Server → Client ----
type ServerMessages = {
  CLOCK: { now: number };
  'QR_CODE:SEND': { qrCode: string };
  'SESSION:CREATE': { qrCode: string };
  'SESSION:STATE': { session: Session };
  'SESSION:JOINED': { playerId: UUID };
};

export type ServerMessage = {
  [K in keyof ServerMessages]: undefined extends ServerMessages[K]
    ? { type: K; payload?: ServerMessages[K] }
    : { type: K; payload: ServerMessages[K] };
}[keyof ServerMessages];

// ---- Client → Server ----
// Eine Zeile pro Message: Name → Payload, `undefined` = Message ohne Payload.
type ClientMessages = {
  'QR_CODE:REQUEST': undefined;
  'SESSION:REQUEST': undefined;
  'SESSION:JOIN': { player: { name: string } };
};

export type ClientMessage = {
  [K in keyof ClientMessages]: undefined extends ClientMessages[K]
    ? { type: K; payload?: ClientMessages[K] }
    : { type: K; payload: ClientMessages[K] };
}[keyof ClientMessages];
