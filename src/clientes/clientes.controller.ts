import { Controller, Get, Post, Patch,Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { createClienteDto } from './Dto/createCliente.dto';
import { updateClienteDto } from './Dto/updateCliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private clienteService:ClientesService){}


    @Get()
    async consultarClientes(){
        return this.clienteService.buscarClientes()
    }
    
    @Get(':nombre')
    async consultarCliente(@Param('nombre') nombre:string){
        return this.clienteService.buscarCliente(nombre)
    }

    @Post()
    async createCliente(@Body() newCliente:createClienteDto){
        return this.clienteService.createCliente(newCliente)
    }

    @Delete(':id_cliente')
    async borrarCliente(@Param('id_cliente', ParseIntPipe) id_cliente:number){
        return this.clienteService.borrarCliente(id_cliente)
    }

    @Patch("actualizar/:id_cliente")
    async updateCliente(@Param('id_cliente', ParseIntPipe) id_cliente:number, @Body() updateCliente:updateClienteDto){
        return this.clienteService.updateCliente(id_cliente,updateCliente)
    }
}
