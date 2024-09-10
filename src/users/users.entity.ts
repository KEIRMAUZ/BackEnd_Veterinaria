import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id_user:number

    @Column({type:"varchar", length:20})
    name:string

    @Column()
    password:string
}