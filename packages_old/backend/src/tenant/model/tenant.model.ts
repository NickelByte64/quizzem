import { UserModel } from 'src/user/model/user.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('tenant')
export class TenantModel extends QuizzemModel {
  @OneToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}
