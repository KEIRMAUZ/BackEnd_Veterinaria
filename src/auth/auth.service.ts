import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor ( private userService:UsersService, private jwtService: JwtService){}

    async signIn(name: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.buscarUsuario(name);
        if(user.name !== name){
            throw new UnauthorizedException("Usuario invalido");
        }
    
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new UnauthorizedException(`Tu usuario es: ${user.name} y tu contraseña es: ${user.password}`);
        }
    
        const payload = { sub: user.id_user, username: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    
}
