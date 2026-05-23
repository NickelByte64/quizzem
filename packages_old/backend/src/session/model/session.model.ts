import { UserModel } from 'src/user/model/user.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('session')
export class SessionModel extends QuizzemModel {
  @Column()
  expiredAt: Date = new Date();

  @ManyToOne(() => UserModel, (user) => user.sessions)
  user: UserModel;
}
