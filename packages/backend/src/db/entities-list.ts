import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { QuestionModel } from 'src/question/model/question.model';

/**
 * List of entities used in the application.
 */
export const ENTITIES_LIST: EntityClassOrSchema[] = [QuestionModel];
