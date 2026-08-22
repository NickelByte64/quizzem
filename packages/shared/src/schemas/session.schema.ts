import { z } from 'zod';

export const playerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  connected: z.boolean(),
  ready: z.boolean(),
});
export type Player = z.infer<typeof playerSchema>;

export const sessionSchema = z.object({
  id: z.string(),
  state: z.enum(['LOBBY', 'PLAYING']),
  players: z.array(playerSchema),
  createdAt: z.number(),
  host: playerSchema.nullable(),
});
export type Session = z.infer<typeof sessionSchema>;
