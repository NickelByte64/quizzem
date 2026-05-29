import { Module } from '@nestjs/common';
import { HostGateway } from '~/src/features/host/host.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [HostGateway],
})
export class HostModule {}
