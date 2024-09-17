import { Controller, Get, Post, Delete,Param, Put, Body, ParseIntPipe } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { createMascotaDto } from './Dto/crearMascota.dto';
import { updateMascotaDto } from './Dto/updateMascota.dto';

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
    async crearRegistro(@Body() createMascota:createMascotaDto){
        return this.mascotaService.crearMascota(createMascota)
    }

    @Delete(':id_mascota')
    async deleteMascota(@Param('id_mascota', ParseIntPipe) id_mascota:number){
        return this.mascotaService.deleteMascota(id_mascota)
    }

    @Put('actualizar/:id_mascota')
    async actualizarMascota(@Param('id_mascota', ParseIntPipe) id_mascota:number ,@Body() updateMascota:updateMascotaDto){
        return this.mascotaService.updateMascota(id_mascota,updateMascota)
    }

}
