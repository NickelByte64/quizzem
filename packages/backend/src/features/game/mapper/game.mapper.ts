import { GameDto } from 'src/features/game/api/dto/game.dto';
import { GameModel } from 'src/features/game/model/game.model';
import { QuestionMapper } from 'src/features/question/mapper/question.mapper';

export class GameMapper {
  static toDto(model: GameModel): GameDto {
    return {
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      state: model.state,
      title: model.title,
      description: model.description,
      questions: model.questions.map((question) =>
        QuestionMapper.toQuestionDto(question),
      ),
    };
  }

  static toDtoList(models: GameModel[]): GameDto[] {
    return models.map((model) => this.toDto(model));
  }
}
