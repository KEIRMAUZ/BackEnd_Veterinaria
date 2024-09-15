import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { Mascota } from './mascotas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Mascota])
  ],
  controllers: [MascotasController],
  providers: [MascotasService]
})
export class MascotasModule {}
