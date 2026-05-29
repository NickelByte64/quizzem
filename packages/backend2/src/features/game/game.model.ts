import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { QuizzemModel } from '~/src/core/domain/quizzem.model';
import { type GameState } from '~/src/features/game/game-state.model';
import { QuestionModel } from '~/src/features/question/question.model';

@Entity()
export class GameModel extends QuizzemModel {
  @Column()
  state: GameState = 'DRAFT';

  @Column({ type: 'varchar', length: 256, nullable: true })
  title: string | null = null;

  @Column({ type: 'varchar', nullable: true, length: 512 })
  description: string | null = null;

  @ManyToMany(() => QuestionModel)
  @JoinTable()
  questions!: QuestionModel[];
}
