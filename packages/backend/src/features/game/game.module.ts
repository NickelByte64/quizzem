import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from 'src/features/game/api/game.controller';
import { GameModel } from 'src/features/game/model/game.model';
import { GameService } from 'src/features/game/service/game.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameModel])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
