import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "*",
    allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization'
  })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))


  await app.listen(process.env.PORT || 3000, "0.0.0.0");
}
bootstrap();
