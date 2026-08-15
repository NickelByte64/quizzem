import type { UUID } from 'node:crypto';

export type GameRoomModel = {
  id: UUID;
  name: string;
  clients: unknown[];
  clock: number;
};

export type GameRoomDto = {
  id: UUID;
  name: string;
  clients: unknown[];
  clock: number;
};

export type CreateGameRoomDto = {
  name: string;
};
