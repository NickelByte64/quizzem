import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { CreateGameDto } from 'src/game/dto/create-game.dto';
import { GameRoundModel } from 'src/game/model/game-round.model';
import { GameModel } from 'src/game/model/game.model';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameModel)
    private readonly gameRepository: Repository<GameModel>,
    @InjectRepository(GameRoundModel)
    private readonly gameRoundRepository: Repository<GameRoundModel>,
  ) {}

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
