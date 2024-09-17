import { Controller, Get, Post, Param, Body, Delete, Put, ParseIntPipe} from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { createServicioDto } from './Dto/createServicio.dto';
import { updateServicioDto } from './Dto/updateServicio.dto';

@Controller('servicios')
export class ServiciosController {
    constructor(private servicioService:ServiciosService){}

    @Get()
    async obtenerServicios(){
        return this.servicioService.buscarServicios()
    }

    @Get(':id_servicio')
    async optenerServicio(@Param('id_servicio') id_servicio:number){
        return this.servicioService.buscarServicio(id_servicio)
    }

    @Post()
    async crearServicio(@Body() newServicio:createServicioDto){
        return this.servicioService.createServicio(newServicio)
    }

    @Put('actualizar/:id_servicio')
    async updateServicio(@Param('id_servicio', ParseIntPipe) id_servicio:number, @Body() updateServicio:updateServicioDto){
        return this.servicioService.updateServicio(id_servicio, updateServicio)
    }

    @Delete(':id_servicio')
    async borrarServicio(@Param('id_servicio', ParseIntPipe) id_servicio:number){
        return this.servicioService.deleteServicio(id_servicio)
    }

}
