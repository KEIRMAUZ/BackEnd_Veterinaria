import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './Dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    async buscarUsuario(name: string) {
        return await this.userRepository.findOne({
            where: { name },
        });
    }
    
    async buscarUsuarios(){
        return this.userRepository.find()
    }

    async createUser(User:createUserDto){
        const {name,password} =  User

        const user = await this.userRepository.findOne({
            where:{
                name
            }
        })

        if(user){
            throw new HttpException("El usuario ya existe en la base de datos", HttpStatus.CONFLICT)
        }

        const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

        const newUser = this.userRepository.create({
            name, password:passwordHash
        })
        return this.userRepository.save(newUser)
    }

}