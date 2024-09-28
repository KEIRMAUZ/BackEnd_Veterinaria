import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constantes/constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
    
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
            const cookieHeader = request.headers.cookie;
            if (cookieHeader) {
                const match = cookieHeader.match(/auth_token=([^;]+)/);
                if (match) {
                    return match[1];
                }
            }
            return undefined;
        }
        
        
    }