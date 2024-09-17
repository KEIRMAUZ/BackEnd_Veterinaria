import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mascotas } from './mascotas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMascotaDto } from './Dto/crearMascota.dto';
import { updateMascotaDto } from './Dto/updateMascota.dto'; 

@Injectable()
export class MascotasService {
    constructor(@InjectRepository(Mascotas) private mascotaRepository:Repository<Mascotas>){}

    async optenerMascotas(){
        return this.mascotaRepository.find({
            relations:['cliente']
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
