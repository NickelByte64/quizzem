import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'node:crypto';
import { PageableDto } from 'src/core/api/pageable.dto';
import { CreateGameDto } from 'src/features/game/api/dto/create-game.dto';
import { GetAllGamesParamsDto } from 'src/features/game/api/dto/get-all-games-params.dto';
import { UpdateGameDto } from 'src/features/game/api/dto/update-game.dto';
import { GameModel } from 'src/features/game/model/game.model';
import { QuestionModel } from 'src/features/question/model/question.model';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameModel)
    private readonly gameRepository: Repository<GameModel>,
    private readonly dataSource: DataSource,
  ) {}

  async listGames(
    params: GetAllGamesParamsDto,
  ): Promise<PageableDto<GameModel>> {
    const [records, count] = await this.gameRepository.findAndCount({
      skip: params.page * params.size,
      take: params.size,
      relations: {
        questions: {
          answers: true,
        },
      },
    });

    return new PageableDto({
      data: records,
      page: params.page,
      size: params.size,
      totalElements: count,
    });
  }

  async getGameById(id: UUID): Promise<GameModel> {
    const record = await this.gameRepository.findOne({
      where: { id },
      relations: { questions: { answers: true } },
    });
    if (!record) {
      throw new NotFoundException(`Game with id ${id} not found`);
    }
    return record;
  }

  async createGame(dto: CreateGameDto): Promise<UUID> {
    const newGame = new GameModel();
    newGame.title = dto.title;
    newGame.description = dto.description;
    const saved = await this.gameRepository.save(newGame);
    return saved.id;
  }

  async updateGame(id: UUID, dto: UpdateGameDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const game = await manager.findOneBy(GameModel, { id });
      if (!game) {
        throw new NotFoundException(`Game with id ${id} not found`);
      }

      if (dto.title !== null) game.title = dto.title.trim();
      if (dto.description !== null) game.description = dto.description.trim();
      if (dto.questions !== null) {
        game.questions = await manager.findBy(QuestionModel, {
          id: In(dto.questions.map((questionId) => questionId)),
        });
      }

      await manager.save(game);
    });
  }

  async deleteGame(id: UUID): Promise<void> {
    await this.gameRepository.delete({ id });
  }
}
