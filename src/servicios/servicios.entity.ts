import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

    @Column()
    fecha:Date

}