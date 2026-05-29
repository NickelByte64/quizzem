import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UUID } from 'node:crypto';
import { CreateGameDto } from '~/src/features/game/dto/create-game.dto';
import { GameDto } from '~/src/features/game/dto/game.dto';
import { GameMapper } from '~/src/features/game/game.mapper';
import { GameService } from '~/src/features/game/game.service';

@Controller('games')
export class GameController {
  private readonly gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  @Get()
  async getGames(): Promise<GameDto[]> {
    const gameModels = await this.gameService.getGames();
    return GameMapper.toDtoList(gameModels);
  }

  @Post()
  async createGame(
    @Body() createGameDto: CreateGameDto,
  ): Promise<{ id: UUID }> {
    const gameModel = await this.gameService.createGame(createGameDto);
    return { id: GameMapper.toDto(gameModel).id };
  }

  @Put()
  async updateGame() {
    throw new Error('Not implemented');
  }
}
