import type { IncomingMessage } from 'node:http';
import WebSocket from 'ws';
import { WsParser } from '../../../utils/ws.parser.ts';
import { QuestionService } from '../domain/question.service.ts';

export async function QuestionHandler(ws: WebSocket, req: IncomingMessage): Promise<void> {
  ws.on('message', async (raw) => {
    const clientMessage = WsParser.parseClientMessage(raw);
    if (!clientMessage) return;

    try {
      switch (clientMessage.type) {
        case 'SESSION:CREATE':
          QuestionService.listQuestions(ws);
          break;
      }
    } catch (err) {
      console.error('[ws] handler failed', err);
    }
  });
}
