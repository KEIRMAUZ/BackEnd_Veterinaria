import { Controller, Get, Post, Delete,Param, Put, Body, ParseIntPipe,UseInterceptors, UploadedFile,HttpException, HttpStatus } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { createMascotaDto } from './Dto/crearMascota.dto';
import { updateMascotaDto } from './Dto/updateMascota.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('mascotas')
export class MascotasController {
    constructor(private mascotaService:MascotasService){}

    @Get()
    async ooptenerMascotas(){
        return this.mascotaService.optenerMascotas()
    }

    @Get(':name')
    async optenerMascita(@Param('name') name:string){
        return this.mascotaService.optenerMascota(name)
    } 

    @Post()
    @UseInterceptors(FileInterceptor('imagen')) 
    async crearRegistro(
        @Body() createMascota: createMascotaDto, 
        @UploadedFile() imagen: Express.Multer.File 
    ) {
        console.log('Datos recibidos:', createMascota);
        console.log('Archivo recibido:', imagen);

        try {
            const mascotaCreada = await this.mascotaService.crearMascota(createMascota, imagen);
            console.log('Mascota creada:', mascotaCreada);
            return mascotaCreada;
        } catch (error) {
            console.error('Error al crear la mascota:', error);
            throw new HttpException('Error al crear la mascota', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id_mascota')
    async deleteMascota(@Param('id_mascota', ParseIntPipe) id_mascota:number){
        return this.mascotaService.deleteMascota(id_mascota)
    }

    @Put('actualizar/:id_mascota')
    async actualizarMascota(@Param('id_mascota', ParseIntPipe) id_mascota:number, @Body() updateMascota:updateMascotaDto){
        return this.mascotaService.updateMascota(id_mascota,updateMascota)
    }

}


