import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantModel } from 'src/tenant/model/tenant.model';
import { TenantService } from './tenant.service';

@Module({
  imports: [TypeOrmModule.forFeature([TenantModel])],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
