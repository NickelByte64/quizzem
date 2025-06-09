import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRoundModel } from 'src/game/model/game-round.model';
import { GameModel } from 'src/game/model/game.model';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameModel, GameRoundModel])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
