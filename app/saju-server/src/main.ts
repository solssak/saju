import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 자동으로 DTO 타입으로 변환
      whitelist: true, // DTO에 정의되지 않은 속성 제거
    }),
  );
  await app.listen(process.env.BACKEND_PORT ?? 3001);
}
bootstrap();
