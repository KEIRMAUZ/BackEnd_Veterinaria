import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicios } from './servicios.entity'; 
import { Repository } from 'typeorm';
import { createServicioDto } from './Dto/createServicio.dto'
import { updateServicioDto } from './Dto/updateServicio.dto';

@Injectable()
export class ServiciosService {
    constructor(@InjectRepository(Servicios) private servicioRepository:Repository<Servicios>){}

    async buscarServicio(id_servicio:number){
        const servicio = await this.servicioRepository.findOne({
            where:{
                id_servicio
            }
        })

        return servicio
    }

    async buscarServicios(){
        return this.servicioRepository.find({
            relations:['mascotas', 'cliente']
        })
    }

    async createServicio(newServicio:createServicioDto){
        const servicio =  this.servicioRepository.create(newServicio)
        return this.servicioRepository.save(servicio)
    }

    async deleteServicio(id_servicio:number){
        const servicio = await this.servicioRepository.findOne({
            where:{
                id_servicio
            }
        })

        if(!servicio){
            throw new HttpException("El servicio no fue encontrado", HttpStatus.NOT_FOUND)
        }

        return this.servicioRepository.delete(id_servicio)
    }

    async updateServicio(id_servicio:number, servicio:updateServicioDto){

        const servicioFound = await this.servicioRepository.findOne({
            where:{
                id_servicio
            }
        })

        if(!servicioFound){
            throw new HttpException("Servicio no encontrado", HttpStatus.NOT_FOUND)
        }

        const updateServicio = Object.assign(servicioFound,servicio)

        return this.servicioRepository.save(updateServicio)
    }

}
