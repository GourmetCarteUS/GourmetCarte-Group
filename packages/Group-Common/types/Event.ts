import {IUser} from './User';
import {ICategory} from "./Category";

export interface IEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    geoLocation: string;
    startAt: Date;
    creator: IUser;
    category: ICategory[];
    maxParticipants: number;
    imageDescription: string[];
    disable: boolean;
    groupQr: string;

    participants: IUser[];

    createdAt: Date;
    updatedAt: Date;
}
