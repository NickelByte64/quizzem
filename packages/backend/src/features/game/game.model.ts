import { Column, Entity } from 'typeorm';
import { QuizzemModel } from '~/src/core/domain/quizzem.model';
import { type GameState } from '~/src/features/game/game-state.model';

@Entity()
export class GameModel extends QuizzemModel {
  @Column()
  state: GameState = 'DRAFT';
}
