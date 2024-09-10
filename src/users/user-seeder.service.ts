import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './Dto/createUser.dto';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UsersService) {}

  async run() {
    try {
      const adminUser = await this.userService.buscarUsuario('Admin');

      if (!adminUser) {
        
        const newUser: createUserDto = { name: 'Admin', password: 'admin' };
        await this.userService.createUser(newUser);
        console.log('Usuario Admin creado!');
      } else {
        console.log('Admin ya existe.');

      }
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        console.log('User not found. Creating admin user...');
        const newUser: createUserDto = { name: 'Admin', password: 'admin' };
        await this.userService.createUser(newUser);
        console.log('Usuario Admin creado por defecto!');
      } else {
        throw error;
      }
    }
  }
}
