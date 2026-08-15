import express, { type Request, type Response } from 'express';
import { GameRoomService } from '../service/game-room.service.ts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  await GameRoomService.getGameRooms(req, res);
});

router.post('/', async (req: Request, res: Response) => {
  await GameRoomService.createGameRoom(req, res);
});

export default router;
