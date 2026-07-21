import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { UUID } from 'node:crypto';
import { PageableDto } from 'src/core/api/pageable.dto';
import { CreateGameResponseDto } from 'src/features/game/api/dto/create-game-response.dto';
import { CreateGameDto } from 'src/features/game/api/dto/create-game.dto';
import { GameDto } from 'src/features/game/api/dto/game.dto';
import { GetAllGamesParamsDto } from 'src/features/game/api/dto/get-all-games-params.dto';
import { UpdateGameDto } from 'src/features/game/api/dto/update-game.dto';
import { GameMapper } from 'src/features/game/mapper/game.mapper';
import { GameService } from 'src/features/game/service/game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async listGames(
    @Query() params: GetAllGamesParamsDto,
  ): Promise<PageableDto<GameDto>> {
    const games = await this.gameService.listGames(params);

    const { data, ...rest } = games;

    return {
      ...rest,
      data: GameMapper.toDtoList(data),
    };
  }

  @Get(':id')
  async getGameById(@Param('id', ParseUUIDPipe) id: UUID): Promise<GameDto> {
    const game = await this.gameService.getGameById(id);
    return GameMapper.toDto(game);
  }

  @Post()
  async createGame(@Body() dto: CreateGameDto): Promise<CreateGameResponseDto> {
    const id = await this.gameService.createGame(dto);
    return { id };
  }

  @Patch(':id')
  @HttpCode(204)
  async updateGame(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() dto: UpdateGameDto,
  ): Promise<void> {
    return await this.gameService.updateGame(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteGame(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    return await this.gameService.deleteGame(id);
  }
}
