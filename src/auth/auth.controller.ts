import { Controller, Body, Post, Delete, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Public } from './constantes/decoradorPublic';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Public()
    @Get("test")
  async testBcrypt() {
    const testPassword = 'admin'.trim(); // La contraseña que estás usando para la autenticación
    const storedHash = '$2b$10$m6DQqaSQA2Q1/KccX/Ru3ud99hUvXwQwnsU4IFvqvjTtmw/yd6J.K'; // El hash almacenado en la base de datos

    try {
      const isMatch = await bcrypt.compare(testPassword, storedHash);
      return {
        storedHash,
        providedPassword: testPassword,
        isPasswordValid: isMatch
      };
    } catch (error) {
      return { error: 'Error comparing password' };
    }
  }

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
