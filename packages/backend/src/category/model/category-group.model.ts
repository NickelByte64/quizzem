import { CategoryModel } from 'src/category/model/category.model';
import { QuizzemModel } from 'src/utils/quizzem.model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('category_group')
export class CategoryGroupModel extends QuizzemModel {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @OneToMany(() => CategoryModel, (category) => category.group)
  categories: CategoryModel[];
}
