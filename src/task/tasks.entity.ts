/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
