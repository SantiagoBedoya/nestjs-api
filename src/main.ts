import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  await app.listen(config.get('port'), () => {
    Logger.log(`Server:\thttp://localhost:${config.get('port')}`);
  });
}
bootstrap();
