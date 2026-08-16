import { z } from 'zod';

export const clientMessageSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('SESSION:REQUEST') }),
  z.object({
    type: z.literal('SESSION:JOIN'),
    payload: z.object({
      player: z.object({ name: z.string().trim().min(1).max(20) }),
    }),
  }),
]);

export type ClientMessage = z.infer<typeof clientMessageSchema>;
export type ClientMessageOf<K extends ClientMessage['type']> = Extract<ClientMessage, { type: K }>;
