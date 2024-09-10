import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mascota{
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

    @Column()
    id_cliente:number
    
}