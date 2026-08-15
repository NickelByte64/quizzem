// ---- Server → Client ----
type ServerMessages = {
  CLOCK: { now: number };
  SEND_QR_CODE: { qrCode: string };
};

export type ServerMessage = {
  [K in keyof ServerMessages]: { type: K; payload: ServerMessages[K] };
}[keyof ServerMessages];

// ---- Client → Server ----
// Noch ohne Payloads – sobald welche dazukommen, dasselbe Map-Pattern wie oben.
export type ClientMessages = 'REQUEST_QR_CODE';
export type ClientMessage = {
  type: ClientMessages;
};
