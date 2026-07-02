import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'node:crypto';
import { CreateGameDto } from 'src/features/game/api/dto/create-game.dto';
import { GameModel } from 'src/features/game/model/game.model';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameModel)
    private readonly gameRepository: Repository<GameModel>,
  ) {}
  async listGames(): Promise<GameModel[]> {
    return await this.gameRepository.find();
  }

  async createGame(dto: CreateGameDto): Promise<UUID> {
    const newGame = new GameModel();
    newGame.title = dto.title;
    newGame.description = dto.description;
    const saved = await this.gameRepository.save(newGame);
    return saved.id;
  }
}
