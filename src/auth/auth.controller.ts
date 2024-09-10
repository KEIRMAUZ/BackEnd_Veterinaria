import { Controller, Body, Post, Delete, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './constantes/decoradorPublic';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get()
    async saludo (){
        return("Hello Admin")
    }

    @Public()
    @Get('saludo')
    async saludos(){
        return ("Segun no use decorador de guard")
    }
}
