import { initDb } from './core/db.ts';
import { startHttpServer } from './http.server.ts';
import { startWebSocketServer } from './ws.server.ts';

initDb();
startWebSocketServer();
startHttpServer();

