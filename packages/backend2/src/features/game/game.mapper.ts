import { GameDto } from '~/src/features/game/dto/game.dto';
import { GameModel } from '~/src/features/game/game.model';

export class GameMapper {
  static toDto(game: GameModel): GameDto {
    return {
      id: game.id,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
      state: game.state,
      title: game.title,
      description: game.description,
      questions: game.questions,
    };
  }

  static toDtoList(gameModels: GameModel[]): GameDto[] {
    return gameModels.map((game) => this.toDto(game));
  }
}
