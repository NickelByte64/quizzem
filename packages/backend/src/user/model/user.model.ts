import * as bcrypt from 'bcrypt';
import { SessionModel } from 'src/session/model/session.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserModel extends QuizzemModel {
  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  // ------ Relations ------

  @OneToMany(() => SessionModel, (session) => session.user)
  sessions: SessionModel[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
