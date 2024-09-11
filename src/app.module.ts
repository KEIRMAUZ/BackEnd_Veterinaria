import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ServiciosModule } from './servicios/servicios.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    AuthModule, ClientesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql.railway.internal',
      port: 3306,
      
      username: 'root',
      password: 'd83b80f2-1543-45f8-abac-0db4b66f3ce2',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      
    }),
    UsersModule,
    MascotasModule,
    ServiciosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
