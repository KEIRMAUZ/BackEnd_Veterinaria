import { Mascotas } from "src/mascotas/mascotas.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Servicios } from "src/servicios/servicios.entity";

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id_cliente:number

    @Column()
    nombre:string

    @Column()
    apellidos:string

    @Column({type:'bigint'})
    telefono:number

    @Column() 
    direccion:string

    @OneToMany(() => Mascotas, (mascota) => mascota.cliente)
    mascota: Mascotas[];

    @OneToMany(() => Servicios, (servicio) => servicio.cliente)
    servicio: Servicios[];
}