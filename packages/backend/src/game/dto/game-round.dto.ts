import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EGameRoundType } from 'src/game/enum/game-round-type.enum';

export class GameRoundDto {
  /**
   * The type of the game round.
   * This determines the rules and behavior of the round.
   */
  @IsNotEmpty()
  type: EGameRoundType;
  /**
   * The number of questions or actions in this round.
   */
  @IsNumber()
  @IsNotEmpty()
  count: number;
  /**
   * The time limit for this round in seconds.
   */
  @IsNumber()
  @IsNotEmpty()
  timeLimit: number;
  /**
   * The name of the round to display in the UI.
   */
  @IsString()
  @IsNotEmpty()
  name: string;
}
