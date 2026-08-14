export * from './shared.types.ts';

export type ServerMessage = { type: 'clock'; payload: { now: number } };
