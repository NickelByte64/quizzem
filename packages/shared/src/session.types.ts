import type { UUID } from 'node:crypto';

export type Player = {
  id: UUID;
  name: string;
  connected: boolean;
};

export type Session = {
  id: string;
  state: 'LOBBY';
  players: Player[];
  createdAt: number;
};
