import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Todo {

    @PrimaryGeneratedColumn()
    id: string

    @Column({nullable: false})
    task: string

    
    userId: number
}