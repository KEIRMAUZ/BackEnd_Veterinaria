import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';

@Module({
  controllers: [MascotasController],
  providers: [MascotasService]
})
export class MascotasModule {}
