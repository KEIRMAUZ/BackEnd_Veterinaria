import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clientes } from './clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ClientesService {
    constructor(@InjectRepository(Clientes) private clienteRepository: Repository<Clientes>){}

    async buscarClientes(){
        return this.clienteRepository.find()
    }

    async buscarCliente( nombre:string){

        const cliente = await this.clienteRepository.findOne({
            where:{
                nombre
            }
        })

        if(!cliente){
            throw new HttpException("Cliente no registrado", HttpStatus.NOT_FOUND)
        }

        return cliente
    }

    
}
