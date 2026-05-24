import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModel } from '~/src/features/game/game.model';
import { HostController } from '~/src/features/host/host.controller';
import { HostGateway } from '~/src/features/host/host.gateway';
import { HostService } from '~/src/features/host/host.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameModel])],
  controllers: [HostController],
  providers: [HostGateway, HostService],
})
export class HostModule {}
