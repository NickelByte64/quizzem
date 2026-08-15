import { type UUID } from 'node:crypto';

export type GameRoomModel = {
  id: UUID;
  name: string;
  clients: unknown[];
  clock: number;
};

export const GAME_ROOM: GameRoomModel = {
  id: 'ab45dde6-b71e-40b4-aa45-754077a8215a',
  clock: Date.now(),
  name: 'This is a test game room',
  clients: [],
};
