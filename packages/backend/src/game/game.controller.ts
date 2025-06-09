import { Body, Controller, Post } from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async createGame(@Body() data: CreateGameDto): Promise<UUID> {
    return await this.gameService.createGame(data);
  }
}
