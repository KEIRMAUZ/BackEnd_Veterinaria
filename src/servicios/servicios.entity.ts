import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Servicios {
    
    @PrimaryGeneratedColumn()
    id_servicio:number

    @Column()
    id_mascota:number

    @Column()
    costo:number
}