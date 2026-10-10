import type { ServerMessage } from '@quizzem/shared';
import WebSocket from 'ws';
import QUESTION_DATA from './quesiton.data.json' with { type: 'json' };

function listQuestions(ws: WebSocket): void {
  ws.send(JSON.stringify({ type: 'QUESTION:LIST', payload: { questions: QUESTION_DATA } } satisfies ServerMessage));
}

export const QuestionService = { listQuestions };
