import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModel } from 'src/session/model/session.model';
import { SessionService } from './session.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionModel])],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
