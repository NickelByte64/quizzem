import express, { type Request, type Response } from 'express';
import { QuizService } from '../domain/quiz.service.ts';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  QuizService.getQuiz(req, res);
});

export default router;
