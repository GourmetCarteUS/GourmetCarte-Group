import {IBanner} from 'group-common';
import {Column, Entity} from 'typeorm';
import {BaseModel} from './BaseModel.js';

@Entity()
export class Banner extends BaseModel implements IBanner {

    @Column({nullable: true})
    name: string;

    @Column({default: 0})
    sort: number;

    @Column({nullable: true})
    imgUrl: string;

    @Column({nullable: true})
    link: string;

    @Column({default: true})
    show: boolean;
}
