import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { Mascotas } from './mascotas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientes } from 'src/clientes/clientes.entity';
import { HttpModule } from '@nestjs/axios';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { join } from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'; 

@Module({
  imports:[
    TypeOrmModule.forFeature([Mascotas, Clientes]),HttpModule,
  ],
  controllers: [MascotasController],
  providers: [MascotasService, CloudinaryService]
})
export class MascotasModule {}
