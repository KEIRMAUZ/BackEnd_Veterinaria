import { Controller, Get, Post, } from '@nestjs/common';
import { ServiciosService } from './servicios.service';

@Controller('servicios')
export class ServiciosController {
    constructor(private servicioService:ServiciosService){}

    @Get()
    async obtenerServicios(){
        return this.servicioService.buscarServicios()
    }
}
