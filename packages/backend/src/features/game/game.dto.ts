import { QuizzemDto } from '~/src/core/domain/quizzem.dto';
import { type GameState } from '~/src/features/game/game-state.model';

export class GameDto extends QuizzemDto {
  state: GameState = 'DRAFT';
}
