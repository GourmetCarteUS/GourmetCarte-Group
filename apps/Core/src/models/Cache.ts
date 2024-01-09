import { ICache } from 'group-common';
import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel.js';

@Entity()
export class Cache extends BaseModel implements ICache {
    @Column()
    key: string;

    @Column({ nullable: true })
    value: string;

    @Column({ type: 'timestamp', nullable: true })
    expiry: Date;
}
