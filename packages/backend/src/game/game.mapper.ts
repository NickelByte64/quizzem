import { GameDto } from 'src/game/dto/game.dto';
import { GameModel } from 'src/game/model/game.model';

export class GameMapper {
  static toDto(game: GameModel): GameDto {
    return {
      id: game.id,
      createdAt: game.createdAt,
      name: game.name,
      rounds: game.rounds.map((round) => ({
        id: round.id,
        createdAt: round.createdAt,
        type: round.type,
        name: round.name,
        count: round.count,
        timeLimit: round.timeLimit,
      })),
    };
  }

  static toDtoList(games: GameModel[]): GameDto[] {
    return games.map((game) => this.toDto(game));
  }
}
