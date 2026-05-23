import { QuestionDto } from 'src/question/dto/question.dto';
import { QuestionModel } from 'src/question/model/question.model';

export class QuestionMapper {
  static toDto(model: QuestionModel): QuestionDto {
    return {
      id: model.id,
      createdAt: model.createdAt,
      question: model.question,
      questionType: model.questionType,
      answers: model.answers ?? null,
      correctAnswer: model.correctAnswer,
    };
  }

  static toDtoList(models: QuestionModel[]): QuestionDto[] {
    return models.map(this.toDto);
  }
}
