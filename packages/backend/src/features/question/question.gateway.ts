import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('next-question')
  onEvent(@MessageBody() data: any, @ConnectedSocket() client: WebSocket) {
    console.log('data ', data);
  }
}
