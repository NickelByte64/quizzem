import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { IEnvVariables } from 'src/utils/env.types';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<IEnvVariables>);

  const frontendUrl = configService.get('FRONTEND_URL', { infer: true })!;
  const port = configService.get('BACKEND_PORT', { infer: true })!;

  app.use(cookieParser(configService.getOrThrow('COOKIE_PARSER_SECRET_KEY')));

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
