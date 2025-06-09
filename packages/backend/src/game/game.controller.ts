import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UUID } from 'crypto';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { GameDto } from 'src/game/dto/game.dto';
import { GameMapper } from 'src/game/game.mapper';
import { PageableQueryDto } from 'src/utils/pageable/dto/pageable-query.dto';
import { PageableDto } from 'src/utils/pageable/dto/pageable.dto';
import { PageableQuery } from 'src/utils/pageable/pageable.query';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async findAllGames(
    @PageableQuery() query: PageableQueryDto,
  ): Promise<PageableDto<GameDto>> {
    return await this.gameService.findAllGames(query);
  }

  @Get(':id')
  async findGameById(@Param('id') id: UUID): Promise<GameDto> {
    const game = await this.gameService.findGameById(id);
    return GameMapper.toDto(game);
  }

  @Post()
  async createGame(@Body() data: CreateGameDto): Promise<UUID> {
    return await this.gameService.createGame(data);
  }
}
