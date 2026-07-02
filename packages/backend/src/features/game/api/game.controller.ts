import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGameResponseDto } from 'src/features/game/api/dto/create-game-response.dto';
import { CreateGameDto } from 'src/features/game/api/dto/create-game.dto';
import { GameDto } from 'src/features/game/api/dto/game.dto';
import { GameMapper } from 'src/features/game/mapper/game.mapper';
import { GameService } from 'src/features/game/service/game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async listGames(): Promise<GameDto[]> {
    const games = await this.gameService.listGames();
    return GameMapper.toDtoList(games);
  }

  @Post()
  async createGame(@Body() dto: CreateGameDto): Promise<CreateGameResponseDto> {
    const id = await this.gameService.createGame(dto);
    return { id };
  }
}
