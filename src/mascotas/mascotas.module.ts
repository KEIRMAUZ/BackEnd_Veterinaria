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

@Module({
  imports:[
    TypeOrmModule.forFeature([Mascotas, Clientes]),HttpModule,
    MulterModule.register({
      storage: multer.diskStorage({
        destination: (req,file,cb) => {
          cb(null, 'src/public/imagenes')
        },
        filename:(req,file,cb)=>{
          cb(null, file.originalname)
        }
      }), 
    }),
  ],
  controllers: [MascotasController],
  providers: [MascotasService]
})
export class MascotasModule {}
