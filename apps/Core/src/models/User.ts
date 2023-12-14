import { IUser } from 'group-common';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,Relation } from 'typeorm';
import { Event } from './Event.js';

export abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class User extends BaseModel implements IUser {
    @Column()
    avatarUrl: string;

    @Column()
    displayName: string;
    @Column()
    openId: string;
    @Column()
    unionId: string;

    @OneToMany(type => Event, event => event.creator)
    eventsCreated: Relation<Event>[];

    @ManyToMany(type => Event, event => event.participants)
    eventsJoined: Relation<Event>[];
}