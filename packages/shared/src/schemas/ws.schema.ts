import { z } from 'zod';
import { playerSchema, sessionSchema } from './session.schema.ts';

export const clientMessageSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('SESSION:CREATE'), payload: z.object({ host: playerSchema }) }),
  z.object({
    type: z.literal('SESSION:JOIN'),
    payload: z.object({
      playerId: z.uuid().optional(),
      sessionId: z.string().optional(),
      player: z.object({ name: z.string().trim().min(1).max(20) }),
    }),
  }),
  z.object({ type: z.literal('SESSION:RETRIEVE'), payload: z.object({ sessionId: z.string().optional() }) }),
  z.object({ type: z.literal('HOST:CREATE'), payload: z.object({ name: z.string() }) }),
  z.object({ type: z.literal('HOST:RETRIEVE'), payload: z.object({ hostId: z.uuid() }) }),
]);

export type ClientMessage = z.infer<typeof clientMessageSchema>;
export type ClientMessageOf<K extends ClientMessage['type']> = Extract<ClientMessage, { type: K }>;

export const serverMessageSchema = z.discriminatedUnion('type', [
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
]);

export type ServerMessage = z.infer<typeof serverMessageSchema>;
export type ServerMessageOf<K extends ServerMessage['type']> = Extract<ServerMessage, { type: K }>;
