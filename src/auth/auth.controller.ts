import { Controller, Body, Post, Delete, Get, HttpCode, HttpStatus, Request,Res, UseGuards,UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from './constantes/decoradorPublic';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {

        const { access_token } = await this.authService.signIn(signInDto.name, signInDto.password);

        res.cookie('auth_token', access_token, {
            httpOnly: true, 
            maxAge: 10800000, 
        });
        return res.status(HttpStatus.OK).json({ message: 'Inicio de sesión exitoso' });
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
