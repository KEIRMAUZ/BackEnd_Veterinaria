import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clientes } from './clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createClienteDto } from './Dto/createCliente.dto';
import { updateClienteDto } from './Dto/updateCliente.dto';

@Injectable()
export class ClientesService {
    constructor(@InjectRepository(Clientes) private clienteRepository: Repository<Clientes>){}

    async buscarClientes(){
        return this.clienteRepository.find({
            
            relations:['mascota']
        })
    }

    async buscarCliente( nombre:string){

        const cliente = await this.clienteRepository.findOne({
            where:{
                nombre
            },
            relations:['mascota']
        })

        if(!cliente){
            throw new HttpException("Cliente no registrado", HttpStatus.NOT_FOUND)
        }

        return cliente
    }

    async createCliente(newCliente:createClienteDto){

        const {nombre,telefono,apellidos} = newCliente

        const cliente = await this.clienteRepository.findOne({
            where:{
                nombre,
                apellidos,
                telefono
            }
        })

        if(cliente){
            throw new HttpException("El cliente ya existe", HttpStatus.CONFLICT)
        }

        const clienteCreado =  this.clienteRepository.create(newCliente)
        return this.clienteRepository.save(clienteCreado)
    }

    async borrarCliente(id_cliente:number){
        const cliente = await this.clienteRepository.findOne({
            where:{
                id_cliente
            }
        })

        if(!cliente){
            throw new HttpException("El cliente no existe", HttpStatus.NOT_FOUND)
        }

        return this.clienteRepository.delete(id_cliente)
    }

    async updateCliente(id_cliente:number,updateCliente:updateClienteDto){
        const clienteFound = await this.clienteRepository.findOne({
            where:{
                id_cliente
            }
        })

        if(!clienteFound){
            throw new HttpException("Cliete no registrado",HttpStatus.NOT_FOUND)
        }

        const clienteUp = Object.assign(clienteFound,updateCliente)
        return this.clienteRepository.save(clienteUp)
    }
}
