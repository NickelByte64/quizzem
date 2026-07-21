import { QuizzemModel } from 'src/core/domain/quizzem.model';
import {
  type GameState,
  GameStateEnum,
} from 'src/features/game/model/game-state.model';
import { QuestionModel } from 'src/features/question/model/question.model';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'games' })
export class GameModel extends QuizzemModel {
  @Column({
    type: 'enum',
    enum: GameStateEnum,
    default: GameStateEnum.DRAFT,
  })
  state: GameState = GameStateEnum.DRAFT;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description: string | null = null;

  @ManyToMany(() => QuestionModel, (question) => question.games)
  @JoinTable({
    name: 'games_questions',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'question_id', referencedColumnName: 'id' },
  })
  questions!: QuestionModel[];
}
