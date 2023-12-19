import {ICategory} from 'group-common';
import {Column, Entity, ManyToMany, OneToMany, Relation} from 'typeorm';
import {BaseModel} from './BaseModel.js';
import {Event} from "./Event.js";

@Entity()
export class Category extends BaseModel implements ICategory {

    @Column({nullable: true})
    name: string;
    @Column({default: 0})
    sort: number;

    @ManyToMany(() => Event, (events) => events.category)
    events: Relation<Event>[];
}
