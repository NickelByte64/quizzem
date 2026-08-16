import { z } from 'zod';
import { sessionSchema } from './session.schema.ts';

export const clientMessageSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('SESSION:REQUEST') }),
  z.object({
    type: z.literal('SESSION:JOIN'),
    payload: z.object({
      playerId: z.uuid().optional(),
      player: z.object({ name: z.string().trim().min(1).max(20) }),
    }),
  }),
]);

export type ClientMessage = z.infer<typeof clientMessageSchema>;
export type ClientMessageOf<K extends ClientMessage['type']> = Extract<ClientMessage, { type: K }>;

export const serverMessageSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('CLOCK'),
    payload: z.object({
      now: z.number(),
    }),
  }),
  z.object({
    type: z.literal('SESSION:CREATE'),
    payload: z.object({
      qrCode: z.string(),
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
]);

export type ServerMessage = z.infer<typeof serverMessageSchema>;
export type ServerMessageOf<K extends ServerMessage['type']> = Extract<ServerMessage, { type: K }>;
