import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { GameRoundDto } from 'src/game/dto/game-round.dto';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  rounds: GameRoundDto[];
}
