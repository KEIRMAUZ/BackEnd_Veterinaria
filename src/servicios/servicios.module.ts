import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicios } from './servicios.entity';
import { Mascotas } from 'src/mascotas/mascotas.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Servicios, Mascotas])
  ],
  providers: [ServiciosService],
  controllers: [ServiciosController]
})
export class ServiciosModule {}
