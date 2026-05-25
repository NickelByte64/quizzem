import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from '~/src/features/game/dto/create-game.dto';
import { GameModel } from '~/src/features/game/game.model';

@Injectable()
export class GameService {
  private readonly gameRepository: Repository<GameModel>;

  constructor(
    @InjectRepository(GameModel)
    gameRepository: Repository<GameModel>,
  ) {
    this.gameRepository = gameRepository;
  }

  async getGames(): Promise<GameModel[]> {
    return this.gameRepository.find();
  }

  async createGame(createGameDto: CreateGameDto): Promise<GameModel> {
    const newGame = this.gameRepository.create(createGameDto);
    await this.gameRepository.save(newGame);

    return newGame;
  }
}
