// ---- Server → Client ----
type ServerMessages = {
  CLOCK: { now: number };
  'QR_CODE:SEND': { qrCode: string };
};

export type ServerMessage = {
  [K in keyof ServerMessages]: { type: K; payload: ServerMessages[K] };
}[keyof ServerMessages];

// ---- Client → Server ----
// Eine Zeile pro Message: Name → Payload, `undefined` = Message ohne Payload.
type ClientMessages = {
  'QR_CODE:REQUEST': undefined;
  'GAME_ROOM:CREATE': { name: string };
};

export type ClientMessage = {
  [K in keyof ClientMessages]: undefined extends ClientMessages[K]
    ? { type: K; payload?: ClientMessages[K] }
    : { type: K; payload: ClientMessages[K] };
}[keyof ClientMessages];
