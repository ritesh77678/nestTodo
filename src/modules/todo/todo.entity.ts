import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/base-entity";
import { User } from "../user/user.entity";

@Entity({name: "todo"})
export class Todo extends BaseEntity {
    
    @Column({nullable: false})
    task: string

    @ManyToOne(() => User, user => user.todos, {onDelete: 'CASCADE'})
    user: string
}