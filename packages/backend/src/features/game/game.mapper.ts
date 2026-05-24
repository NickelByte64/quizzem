import { GameDto } from '~/src/features/game/game.dto';
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
}
