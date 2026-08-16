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
