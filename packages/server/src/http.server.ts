import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import helmet from 'helmet';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import QuizController from './features/quiz/api/quiz.controller.ts';

const app: Express = express();
export const server = createServer(app);

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        // WebSocket-Verbindungen erlauben ('self' deckt ws:// nicht in allen Browsern ab)
        'connect-src': ["'self'", 'ws:'],
        // App läuft bewusst über HTTP im lokalen Netz – kein HTTPS-Upgrade erzwingen
        'upgrade-insecure-requests': null,
      },
    },
  }),
);
app.use(cors({ origin: 'http://localhost:5173' }));
app.disable('x-powered-by');
app.use(express.json());

const CLIENT_DIST = resolve(import.meta.dirname, '../../client/dist');

app.use('/', express.static(CLIENT_DIST));

app.use('/api/quiz', QuizController);

app.get('/*splat', (req: Request, res: Response) => {
  res.sendFile(resolve(CLIENT_DIST, 'index.html'));
});

export function startHttpServer() {
  server.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
  });
}
