import { Injectable, HttpException, HttpStatus,UnauthorizedException } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './Dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

            async buscarUsuario(name: string): Promise<User> {
        console.log(`Buscando usuario con nombre: ${name}`);
        const user = await this.userRepository.findOne({
            where: { name },
        });

        if (!user) {
            throw new UnauthorizedException("El usuario no existe");
        }

        return user;
        }

    async buscarUsuarios() {
        return this.userRepository.find();
    }

    async createUser(userDto: createUserDto) {
        const { name, password } = userDto;

        const existingUser = await this.userRepository.findOne({
            where: { name },
        });
        if (existingUser) {
            throw new HttpException(
                'El usuario ya existe en la base de datos',
                HttpStatus.CONFLICT,
            );
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            name,
            password: passwordHash,
        });
        return this.userRepository.save(newUser);
    }
}
