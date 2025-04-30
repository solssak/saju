import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 자동으로 DTO 타입으로 변환
      whitelist: true, // DTO에 정의되지 않은 속성 제거
    }),
  );

  const port = configService.get<number>('BACKEND_PORT', 3001);
  await app.listen(port);
}
bootstrap();
