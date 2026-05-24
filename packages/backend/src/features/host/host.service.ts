import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameModel } from '~/src/features/game/game.model';

@Injectable()
export class HostService {
  private readonly gameRepository: Repository<GameModel>;

  constructor(
    @InjectRepository(GameModel)
    gameRepository: Repository<GameModel>,
  ) {
    this.gameRepository = gameRepository;
  }

  async createGame(): Promise<GameModel> {
    const newGame = this.gameRepository.create();
    await this.gameRepository.save(newGame);

    return newGame;
  }
}
