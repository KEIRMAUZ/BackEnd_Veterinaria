import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {UserSeederService} from './users/user-seeder.service'
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3200);
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const userSeeder = app.get(UserSeederService);
  await userSeeder.run()

}
bootstrap();
