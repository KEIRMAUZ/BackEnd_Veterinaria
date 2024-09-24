import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mascotas } from './mascotas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMascotaDto } from './Dto/crearMascota.dto';
import { updateMascotaDto } from './Dto/updateMascota.dto'; 
import { Express } from 'express';
import { join } from 'path'; // Para manejar rutas de archivos
import * as fs from 'fs';
import FormData from 'form-data'; // Para el manejo del form-data
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MascotasService {
    constructor(@InjectRepository(Mascotas) private mascotaRepository:Repository<Mascotas>, private readonly httpService: HttpService){}

    async optenerMascotas(){
        return this.mascotaRepository.find({
            relations:['cliente', 'servicio']
        })
    }

    async optenerMascota(nombre:string){
        const mascota = await this.mascotaRepository.findOne({
            where:{
                nombre
            }
        })

        if(!mascota){
            throw new HttpException(`La mascota con nombre ${nombre} no existe`, HttpStatus.NOT_FOUND)
        }

        return mascota

    }

    async crearMascota(mascota:createMascotaDto){

        console.log('Datos de la mascota antes de guardarse:', mascota);

        const newMascota = this.mascotaRepository.create(mascota)
        return this.mascotaRepository.save(newMascota)
    }

    async updateMascota(id_mascota:number, mascota:updateMascotaDto){
        const mascotaFound = await this.mascotaRepository.findOne({
            where:{
                id_mascota
            }
        })

        if(!mascotaFound){
            throw new HttpException("Mascota no encontrada", HttpStatus.NOT_FOUND)
        }

        const updateMascota = Object.assign(mascotaFound,mascota)
        return this.mascotaRepository.save(updateMascota)

    }

    async deleteMascota(id_mascota:number){
        const mascota = await this.mascotaRepository.findOne({
            where:{
                id_mascota
            }
        })

        if(!mascota){
            throw new HttpException("La mascota a eliminar no existe", HttpStatus.NOT_FOUND)
        }

        return this.mascotaRepository.delete(id_mascota)
    }

    
}
