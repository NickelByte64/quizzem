import { EGameRoundType } from 'src/game/enum/game-round-type.enum';
import { QuizzemDto } from 'src/utils/quizzem.dto';

export class GameRoundDto extends QuizzemDto {
  type: EGameRoundType;
  name: string;
  count: number;
  timeLimit: number;
}
