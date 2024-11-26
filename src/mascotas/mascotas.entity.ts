import { Clientes } from "src/clientes/clientes.entity";
import { Servicios } from "src/servicios/servicios.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

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

    @Column()
    id_cliente:number

    @ManyToOne(() => Clientes, (cliente) => cliente.mascota, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_cliente' })
    cliente: Clientes;

    @OneToMany(() => Servicios, (servicio) => servicio.mascota , { onDelete: 'CASCADE' })
    servicio: Servicios[];
    
}
