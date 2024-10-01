import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mascotas } from './mascotas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createMascotaDto } from './Dto/crearMascota.dto';
import { updateMascotaDto } from './Dto/updateMascota.dto'; 
import { HttpService } from '@nestjs/axios';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable()
export class MascotasService {
    constructor(@InjectRepository(Mascotas) private mascotaRepository:Repository<Mascotas>, private readonly cloudinaryService: CloudinaryService){}

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

    async crearMascota(mascota:createMascotaDto, file?: Express.Multer.File){

        console.log('Datos de la mascota antes de guardarse:', mascota);

        if(file){
            try{
                const uploadResult = await this.cloudinaryService.uploadImage(file);
                mascota.imagen = uploadResult.secure_url;
            }
            catch (error){
                console.error("Error al subir la imagen al servicio de almacenamiento", error)
                throw new HttpException("No se pudo subir la iamgen", HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }

        const newMascota = this.mascotaRepository.create(mascota)
        return this.mascotaRepository.save(newMascota)
    }

    async updateMascota(id_mascota:number, mascota:updateMascotaDto, file?: Express.Multer.File){
        const mascotaFound = await this.mascotaRepository.findOne({
            where:{
                id_mascota
            }
        })

        if(!mascotaFound){
            throw new HttpException("Mascota no encontrada", HttpStatus.NOT_FOUND)
        }

        if(file){
            try{
                const uploadResult = await this.cloudinaryService.uploadImage(file);
                mascota.imagen = uploadResult.secure_url;
            } catch(error){
                throw new HttpException("No se pudo subir la imagen", HttpStatus.INTERNAL_SERVER_ERROR)
            }
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
