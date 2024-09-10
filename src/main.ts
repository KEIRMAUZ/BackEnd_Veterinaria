import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {UserSeederService} from './users/user-seeder.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3200);

  const userSeeder = app.get(UserSeederService);
  await userSeeder.run();

}
bootstrap();
