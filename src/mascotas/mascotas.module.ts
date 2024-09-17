import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { Mascotas } from './mascotas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Mascotas]),ClientesModule
  ],
  controllers: [MascotasController],
  providers: [MascotasService]
})
export class MascotasModule {}
