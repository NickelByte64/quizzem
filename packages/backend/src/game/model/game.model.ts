import { GameRoundModel } from 'src/game/model/game-round.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('game')
export class GameModel extends QuizzemModel {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => GameRoundModel, (round) => round.game)
  rounds: GameRoundModel[];
}
