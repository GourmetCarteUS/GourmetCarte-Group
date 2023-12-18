import {ICategory} from 'group-common';
import {Column, Entity} from 'typeorm';
import {BaseModel} from './BaseModel.js';

@Entity()
export class Category extends BaseModel implements ICategory {

    @Column({nullable: true})
    name: string;
    @Column({default: 0})
    sort: number;
}
