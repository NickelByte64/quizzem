import { AnswerDto } from 'src/features/question/api/dto/answer.dto';
import { QuestionDto } from 'src/features/question/api/dto/question.dto';
import { AnswerModel } from 'src/features/question/model/answer.model';
import { QuestionModel } from 'src/features/question/model/question.model';

export class QuestionMapper {
  static toQuestionDto(model: QuestionModel): QuestionDto {
    return {
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      text: model.text,
      mediaType: model.mediaType,
      answerMode: model.answerMode,
      answers: model.answers.map((answer) => this.toAnswerDto(answer)),
    };
  }

  static toAnswerDto(model: AnswerModel): AnswerDto {
    return {
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      text: model.text,
      isCorrectAnswer: model.isCorrectAnswer,
    };
  }
}
