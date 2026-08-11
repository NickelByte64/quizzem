import { server } from './http.server.ts';
import { wss } from './ws.server.ts';

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established on server side');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});

