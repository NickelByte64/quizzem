import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModel } from 'src/session/model/session.model';
import { SessionService } from 'src/session/session.service';
import { UserModel } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, SessionModel])],
  controllers: [AuthController],
  providers: [AuthService, SessionService, UserService],
})
export class AuthModule {}
