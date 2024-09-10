import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeederService } from './user-seeder.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService, UserSeederService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}