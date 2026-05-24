import { QuizzemDto } from '~/src/core/domain/quizzem.dto';
import { type GameState } from '~/src/features/game/game-state.model';
import { QuestionDto } from '~/src/features/question/question.dto';

export class GameDto extends QuizzemDto {
  state!: GameState;
  title: string | null = null;
  description: string | null = null;
  questions!: QuestionDto[];
}
