import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Mascotas } from "src/mascotas/mascotas.entity";
import { Clientes } from "src/clientes/clientes.entity";

@Entity()
export class Servicios {
    
    @PrimaryGeneratedColumn()
    id_servicio:number

    @Column()
    id_mascota:number

    @Column()
    id_cliente:number

    @Column()
    descripcion:string

    @Column()
    costo:number

    @Column({type:'datetime', default: () => 'CURRENT_TIMESTAMP' })
    fecha:Date

    @ManyToOne(() => Mascotas, (mascota) => mascota.servicio)
    @JoinColumn({ name: 'id_mascota' })
    mascota: Mascotas;

    @ManyToOne(() => Clientes, (cliente) => cliente.servicio)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Clientes;

}