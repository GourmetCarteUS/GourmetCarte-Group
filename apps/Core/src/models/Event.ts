import { IEvent, IUser } from 'group-common';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Relation, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, Index, JoinTable } from 'typeorm';
import { BaseModel } from './BaseModel.js';
import { User } from './User.js';

@Entity()
export class Event extends BaseModel implements IEvent {
    @ManyToOne((type) => User, (user) => user.eventsCreated)
    creator: Relation<User>;
    @Column()
    description: string;
    @Column('point')
    @Index({ spatial: true })
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

    @Column()
    maleTicketFee: number;
    @Column()
    femaleTicketFee: number;
}
