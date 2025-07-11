import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { CategoryGroupModel } from 'src/category/model/category-group.model';
import { CategoryModel } from 'src/category/model/category.model';
import { QuestionModel } from 'src/question/model/question.model';
import { SessionModel } from 'src/session/model/session.model';
import { TenantModel } from 'src/tenant/model/tenant.model';
import { UserModel } from 'src/user/model/user.model';

/**
 * List of entities used in the application.
 */
export const ENTITIES_LIST: EntityClassOrSchema[] = [
  QuestionModel,
  CategoryGroupModel,
  CategoryModel,
  SessionModel,
  UserModel,
  TenantModel,
];
