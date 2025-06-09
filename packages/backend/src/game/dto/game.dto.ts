import { GameRoundDto } from 'src/game/dto/game.round.dto';
import { QuizzemDto } from 'src/utils/quizzem.dto';

export class GameDto extends QuizzemDto {
  name: string;
  rounds: GameRoundDto[];
}
