import {IEvent} from 'group-common';
import {Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToOne, Relation} from 'typeorm';
import {BaseModel} from './BaseModel.js';
import {User} from './User.js';
import {Category} from "./Category.js";

@Entity()
export class Event extends BaseModel implements IEvent {
    @ManyToOne((type) => User, (user) => user.eventsCreated)
    creator: Relation<User>;
    @Column()
    description: string;
    @Column({type: "simple-array", nullable: true})
    imageDescription: string[];

    @Column('point')
    @Index({spatial: true})
    geoLocation: string;

    @Column()
    location: string;

    @ManyToMany((type) => User, (user) => user.eventsJoined)
    @JoinTable()
    participants: Relation<User>[];

    @Column()
    startAt: Date;
    @Column()
    title: string;

    @Column({default: 0})
    maleTicketFee: number;

    @Column({default: 0})
    femaleTicketFee: number;

    @ManyToOne((type) => Category, (category) => category.events)
    category: Relation<Category>;

    @Column({default: 10})
    maxParticipants: number;

    @Column({nullable: true})
    minParticipants: number;

    @Column({default: 0})
    viewCount: number;
}
