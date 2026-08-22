import { z } from 'zod';
import { playerSchema, sessionSchema } from './session.schema.ts';

export const clientMessageSchema = z.discriminatedUnion('type', [
  // session schemas
  // Only the host id travels over the wire – the server resolves the identity itself
  // instead of trusting a host object built by the client.
  z.object({ type: z.literal('SESSION:CREATE'), payload: z.object({ hostId: z.uuid() }) }),
  // A player identity is owned by the player feature, so joining only references it by id.
  z.object({
    type: z.literal('SESSION:JOIN'),
    payload: z.object({
      playerId: z.uuid(),
      sessionId: z.string(),
    }),
  }),
  z.object({ type: z.literal('SESSION:RETRIEVE'), payload: z.object({ sessionId: z.string().optional() }) }),
  z.object({ type: z.literal('SESSION:START'), payload: z.object({ hostId: z.uuid() }) }),
  // host schemas
  z.object({ type: z.literal('HOST:CREATE'), payload: z.object({ name: z.string() }) }),
  z.object({ type: z.literal('HOST:RETRIEVE'), payload: z.object({ hostId: z.uuid() }) }),
  // player schemas
  z.object({ type: z.literal('PLAYER:RETRIEVE'), payload: z.object({ playerId: z.uuid() }) }),
  z.object({ type: z.literal('PLAYER:CREATE'), payload: z.object({ name: z.string().trim().min(1).max(20) }) }),
  z.object({ type: z.literal('PLAYER:SET_READY'), payload: z.object({ playerId: z.uuid() }) }),
  z.object({ type: z.literal('PLAYER:SET_NOT_READY'), payload: z.object({ playerId: z.uuid() }) }),
]);

export type ClientMessage = z.infer<typeof clientMessageSchema>;
export type ClientMessageOf<K extends ClientMessage['type']> = Extract<ClientMessage, { type: K }>;

export const serverMessageSchema = z.discriminatedUnion('type', [
  // session schemas
  z.object({
    type: z.literal('SESSION:JOIN_INFO'),
    payload: z.object({
      qrCode: z.string(),
      plainUrl: z.string(),
    }),
  }),
  z.object({
    type: z.literal('SESSION:STATE'),
    payload: z.object({
      session: sessionSchema,
    }),
  }),
  z.object({
    type: z.literal('SESSION:JOINED'),
    payload: z.object({
      playerId: z.uuid(),
    }),
  }),
  z.object({
    type: z.literal('SESSION:ERROR'),
    payload: z.object({
      message: z.string(),
    }),
  }),
  // host schemas
  z.object({
    type: z.literal('HOST:RETRIEVE'),
    payload: z.object({
      host: playerSchema,
    }),
  }),
  z.object({
    type: z.literal('HOST:ERROR'),
    payload: z.object({
      message: z.string(),
    }),
  }),
  // player schemas
  z.object({ type: z.literal('PLAYER:RETRIEVE'), payload: z.object({ player: playerSchema }) }),
  z.object({
    type: z.literal('PLAYER:ERROR'),
    payload: z.object({
      message: z.string(),
    }),
  }),
]);

export type ServerMessage = z.infer<typeof serverMessageSchema>;
export type ServerMessageOf<K extends ServerMessage['type']> = Extract<ServerMessage, { type: K }>;
