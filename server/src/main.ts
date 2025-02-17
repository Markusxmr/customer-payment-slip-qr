import 'reflect-metadata';
import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { FrontendModule } from './modules/frontend/frontend.module';
import { env } from './common/env';
import { killProcessOnPort } from './common/utils/kill-process-on-port.util';

async function bootstrap() {
  // Kill processes on the API port
  await killProcessOnPort(env.PORT);

  // Create the API instance
  const apiApp = await NestFactory.create<NestExpressApplication>(AppModule);
  apiApp.setGlobalPrefix('api');
  apiApp.enableCors({
    credentials: true,
    allowedHeaders: ['authorization', 'content-type'],
    origin: '*',
  });
  await apiApp.listen(env.PORT);
  console.log(`Server is running on port: ${env.PORT}`);

  // Kill processes on the Frontend port
  await killProcessOnPort(env.FRONTEND_PORT);

  // Create the Frontend instance
  const frontendApp = await NestFactory.create<NestExpressApplication>(FrontendModule);
  await frontendApp.listen(env.FRONTEND_PORT);
  console.log(`Frontend is running on port: ${env.FRONTEND_PORT}`);
}
bootstrap();
