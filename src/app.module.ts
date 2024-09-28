import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { ServiciosModule } from './servicios/servicios.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import { join } from 'path';

@Module({
  imports:[
    AuthModule, ClientesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://root:PpuDdWNdLzuGCeKwMYnnZaPCKTfNPXcv@junction.proxy.rlwy.net:16171/railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public')
    }),
    UsersModule,
    MascotasModule,
    ServiciosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
