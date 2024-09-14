import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constantes/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './constantes/decoradorPublic';
    
    @Injectable()
    export class AuthGuard implements CanActivate {
        constructor(private jwtService: JwtService, private reflector:Reflector) {}
    
        async canActivate(context: ExecutionContext): Promise<boolean> {
            
            const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
                context.getHandler(),
                context.getClass(),
            ]);
        
            if (isPublic) {
                return true;
            }
        
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromRequest(request);
        
            if (!token) {
                throw new UnauthorizedException('Token not found');
            }
        
            try {
                
                const payload = await this.jwtService.verifyAsync(token, {
                    secret: jwtConstants.secret,
                });
        
                
                request['user'] = payload;
            } catch (error) {
                
                console.error('Error al verificar el token:', error);
                throw new UnauthorizedException('Invalid token');
            }
        
            return true;
        }
        
        private extractTokenFromRequest(request: Request): string | undefined {
            console.log('Cookies en la solicitud:', request.cookies);
            if (request.cookies && request.cookies['auth_token']) {
                console.log('Token encontrado en cookies');
                return request.cookies['auth_token'];
            }
            
            const authorizationHeader = request.headers.authorization;
            if (!authorizationHeader) {
                console.log('No se encontró header de autorización');
                return undefined;
            }
            
            const [type, token] = authorizationHeader.split(' ');
            return type === 'Bearer' ? token : undefined;
        }
    }