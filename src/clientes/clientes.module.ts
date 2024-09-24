import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientes } from './clientes.entity';
import {Mascotas} from '../mascotas/mascotas.entity'
import { Servicios } from 'src/servicios/servicios.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Clientes, Mascotas, Servicios])
  ],
  providers: [ClientesService],
  controllers: [ClientesController]
})
export class ClientesModule {}
