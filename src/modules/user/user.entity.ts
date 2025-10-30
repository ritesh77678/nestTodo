import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "src/common/base-entity";
import { Todo } from "../todo/todo.entity";

@Entity({name: "users"})
export class User extends BaseEntity {
    
    @Column({unique: true, nullable: false})
    username: string

    @Column({unique: true, nullable: false})
    email: string

    @Column({nullable: false, select: false})
    password: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Todo, todo => todo.user, {cascade: true})
    todos: Todo[]
}