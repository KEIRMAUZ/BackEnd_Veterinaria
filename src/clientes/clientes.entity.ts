import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Clientes {

    @PrimaryGeneratedColumn()
    id_cliente:number

    @Column()
    nombre:string

    @Column()
    apellidos:string

    @Column()
    telefono:number

    @Column()
    direccion:string
}