import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from '~/src/features/game/game.controller';
import { GameModel } from '~/src/features/game/game.model';
import { GameService } from '~/src/features/game/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameModel])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
