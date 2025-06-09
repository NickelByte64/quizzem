import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { GameRoundModel } from 'src/game/model/game-round.model';
import { GameModel } from 'src/game/model/game.model';
import { PageableQueryDto } from 'src/utils/pageable/dto/pageable-query.dto';
import { PageableDto } from 'src/utils/pageable/dto/pageable.dto';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameModel)
    private readonly gameRepository: Repository<GameModel>,
    @InjectRepository(GameRoundModel)
    private readonly gameRoundRepository: Repository<GameRoundModel>,
  ) {}

  async findAllGames(query: PageableQueryDto): Promise<PageableDto<GameModel>> {
    const { page, size } = query;

    const [data, count] = await this.gameRepository.findAndCount({
      take: size,
      skip: page * size,
      relations: ['rounds'],
    });

    return new PageableDto({
      data,
      totalElements: count,
      page,
      size,
    });
  }

  // TODO Error
  async findGameById(id: UUID): Promise<GameModel> {
    try {
      const game = await this.gameRepository.findOne({
        where: { id },
        relations: ['rounds'],
      });

      if (!game) {
        throw new Error(`Game with ID ${id} not found`);
      }

      return game;
    } catch (error) {
      console.error('Error finding game by ID:', error);
      throw error;
    }
  }

  async createGame(data: CreateGameDto): Promise<UUID> {
    try {
      return await this.gameRepository.manager.transaction(async (manager) => {
        const game = manager.create(GameModel, { name: data.name });
        const savedGame = await manager.save(game);

        const rounds = data.rounds.map((round) =>
          manager.create(GameRoundModel, {
            ...round,
            game: savedGame,
          }),
        );
        await manager.save(rounds);

        return savedGame.id;
      });
    } catch (error) {
      // TODO
      console.error('Error creating game:', error);
      throw error; // Rethrow the error to be handled by the controller
    }
  }
}
