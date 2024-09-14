import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constantes/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
@Module({

  imports:[UsersModule,
  JwtModule.register({
    global:true,
    secret:jwtConstants.secret,
    signOptions:{
      expiresIn:'360m',
      
    },
  }),
  ],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
  controllers: [AuthController]
})
export class AuthModule {}
