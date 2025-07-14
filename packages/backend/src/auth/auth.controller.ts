import { Body, Controller, Get, Post } from '@nestjs/common';
import { RefreshTokenDto } from 'src/auth/dto/refresh-token.dto';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async signIn(@Body() data: SignInDto): Promise<void> {
    return await this.authService.signIn(data);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() data: SignUpDto): Promise<void> {
    return await this.authService.signUp(data);
  }

  @Post('sign-out')
  async signOut(): Promise<void> {
    return await this.authService.signOut();
  }

  @Post('refresh-token')
  async refreshToken(@Body() data: RefreshTokenDto): Promise<void> {
    return await this.authService.refreshToken(data);
  }

  @Public()
  @Get('authenticated')
  async authenticated(): Promise<boolean> {
    return await this.authService.authenticated();
  }
}
