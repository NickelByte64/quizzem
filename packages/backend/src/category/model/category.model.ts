import { CategoryGroupModel } from 'src/category/model/category-group.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('category')
export class CategoryModel extends QuizzemModel {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @ManyToOne(() => CategoryGroupModel, (group) => group.categories, {
    onDelete: 'CASCADE',
  })
  group: CategoryGroupModel;
}
