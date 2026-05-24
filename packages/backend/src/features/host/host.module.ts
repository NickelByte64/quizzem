import { Module } from '@nestjs/common';
import { HostController } from '~/src/features/host/host.controller';
import { HostGateway } from '~/src/features/host/host.gateway';
import { HostService } from '~/src/features/host/host.service';

@Module({
  controllers: [HostController],
  providers: [HostGateway, HostService],
})
export class HostModule {}
