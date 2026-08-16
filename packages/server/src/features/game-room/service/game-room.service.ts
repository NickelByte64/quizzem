import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { knex } from '../../../core/db.ts';

async function getGameRooms(req: Request, res: Response): Promise<Response> {
  const gameRooms = await knex('game_room').select('*');

  return res.json(gameRooms);
}

async function createGameRoom(req: Request, res: Response): Promise<void> {
  // validate the req.body

  // for now just save the content to file
  if (!req.body) throw new Error('Body is required');

  await knex('game_room').insert({ id: randomUUID(), name: req.body.name });

  res.send(200);
}

export const GameRoomService = { createGameRoom, getGameRooms };
