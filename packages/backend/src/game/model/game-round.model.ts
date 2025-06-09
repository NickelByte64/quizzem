import { EGameRoundType } from 'src/game/enum/game-round-type.enum';
import { GameModel } from 'src/game/model/game.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Check, Column, Entity, ManyToOne } from 'typeorm';

@Entity('game_round')
@Check(`"count" > 0 AND "count" <= 10`)
export class GameRoundModel extends QuizzemModel {
  @Column({
    type: 'enum',
    enum: EGameRoundType,
    default: EGameRoundType.STANDARD_QUIZ_ROUND,
  })
  type: EGameRoundType;
  /**
   * Small integer representing the number of questions or actions in this round.
   */
  @Column({ type: 'smallint' })
  count: number;

  /**
   * Smallint representing the time limit for this round in seconds is sufficient
   * as most rounds will not exceed 32767 seconds (546 mins).
   */
  @Column({ type: 'smallint' })
  timeLimit: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => GameModel, (game) => game.rounds)
  game: GameModel;
}
