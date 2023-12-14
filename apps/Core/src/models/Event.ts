import { IEvent, IUser } from 'group-common';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Relation, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, Index, JoinTable } from "typeorm"
import { User } from './User.js';


export abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class Event extends BaseModel implements IEvent {
    @ManyToOne(type => User, user => user.eventsCreated)
    creator: Relation<User>;
    @Column()
    description: string;
    @Column("point")
    @Index({ spatial: true })
    geoLocation: string;
    @Column()
    location: string;

    @ManyToMany(type => User, user => user.eventsJoined)
    @JoinTable()
    participants: Relation<User>[];

    @Column()
    startAt: Date;
    @Column()
    title: string;

    @Column()
    maleTicketFee: number;
    @Column()
    femaleTicketFee: number;
}