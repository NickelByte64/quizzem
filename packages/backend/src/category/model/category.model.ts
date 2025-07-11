import { CategoryGroupModel } from 'src/category/model/category-group.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('category')
export class CategoryModel extends QuizzemModel {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string | null;

  @ManyToOne(() => CategoryGroupModel, (group) => group.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  group: CategoryGroupModel;
}
