import { NestFactory } from '@nestjs/core';
import { CorsConfig } from 'src/core/config/cors.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CorsConfig.getOptions());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
