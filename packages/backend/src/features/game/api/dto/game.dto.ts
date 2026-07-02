import { QuizzemDto } from 'src/core/api/quizzem.dto';
import { GameState } from 'src/features/game/model/game-state.model';
import { QuestionDto } from 'src/features/question/api/dto/question.dto';

export class GameDto extends QuizzemDto {
  state!: GameState;
  title!: string | null;
  description!: string | null;
  questions!: QuestionDto[];
}
