import { IUser } from 'group-common';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Relation } from 'typeorm';
import { BaseModel } from './BaseModel.js';
import { Event } from './Event.js';

@Entity()
export class User extends BaseModel implements IUser {
    @Column({ nullable: true })
    avatarUrl: string;

    @Column({ nullable: true })
    displayName: string;
    @Column({ nullable: true })
    openId: string;
    @Column({ nullable: true })
    unionId: string;

    @OneToMany((type) => Event, (event) => event.creator)
    eventsCreated: Relation<Event>[];

    @ManyToMany((type) => Event, (event) => event.participants)
    eventsJoined: Relation<Event>[];
}
