import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class HostGateway {
  @WebSocketServer()
  server!: Server;

  /**
   * DRAFT -> LOBBY -> COUNTDOWN -> QUESTION -> ANSWER_REVEAL -> SCOREBOARD -> NEXT_QUESTION -> FINAL_RESULTS -> ENDED
   */
}
