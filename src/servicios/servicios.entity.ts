import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Mascotas } from "src/mascotas/mascotas.entity";
import { Clientes } from "src/clientes/clientes.entity";

@Entity()
export class Servicios {
    
    @PrimaryGeneratedColumn()
    id_servicio:number

    @Column()
    id_cliente:number

    @Column()
    id_mascota:number

    @Column()
    descripcion:string

    @Column()
    costo:number

    @Column({default: () => 'CURRENT_TIMESTAMP' })
    fecha:Date

    @OneToOne( ()=> Mascotas, (mascotas => mascotas.servicios))
    @JoinColumn({name:'id_mascota'})
    mascotas:Mascotas

    @OneToOne( ()=> Clientes, (cliente => cliente.servicios))
    @JoinColumn({name:'id_cliente'})
    cliente:Clientes

}