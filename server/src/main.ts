import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });

  app.enableCors({
    credentials: true,
    allowedHeaders: ['authorization', 'content-type'],
    origin: ['http://localhost:10001'],
  });
  // @ts-ignore
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(PORT);
  console.log(`Server is running on port: ${PORT || 3000}`);
}
bootstrap();
