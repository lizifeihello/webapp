import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 让路由变成 /api/..
  //DTO 校验
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只保留 DTO 定义的字段
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = parseInt(process.env.PORT ?? '8080', 10);
  await app.listen(port, '0.0.0.0');
}
bootstrap();