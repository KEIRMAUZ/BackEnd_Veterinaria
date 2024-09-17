import { Clientes } from "src/clientes/clientes.entity";
import { Servicios } from "src/servicios/servicios.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Mascotas{
    @PrimaryGeneratedColumn()
    id_mascota:number

    @Column()
    nombre:string

    @Column()
    raza:string

    @Column()
    alergias:string

    @Column()
    enfermedades:string

    @Column()
    imagen:string


    @ManyToOne(()=> Clientes, (cliente) => cliente.mascotas)
    @JoinColumn({name:'id_cliente'})
    cliente:Clientes

    @OneToOne(()=>Servicios, (servicios)=>servicios.mascotas)
    servicios:Servicios
    
}