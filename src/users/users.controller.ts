import { Controller, Post, Body, Param, Get, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './Dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get()
    async buscarUsuarios(){
        return this.userService.buscarUsuarios()
    }

    @Get(':name')
    async buscarUsuario(@Param('name') name:string){
        return this.userService.buscarUsuario(name)
    }

    @Post('create/user')
    async crearUsuario(@Body() newUser:createUserDto) {
        return this.userService.createUser(newUser)
    }
}
