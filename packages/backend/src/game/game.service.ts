import { Injectable } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { CreateGameDto } from 'src/game/dto/create-game.dto';

@Injectable()
export class GameService {
  createGame(data: CreateGameDto): UUID {
    console.log('Creating game with data:', data);
    return randomUUID();
  }
}
