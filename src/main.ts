import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

const PORT = 4000;

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // var cors = require('cors')
  app.enableCors()

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT).then(() => console.log(`\nserver running on port ${PORT}`));
}
bootstrap();
