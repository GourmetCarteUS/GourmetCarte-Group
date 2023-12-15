import { IUser } from './User';

export interface IEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    geoLocation: string;
    startAt: Date;
    creator: IUser;

    participants: IUser[];

    createdAt: Date;
    updatedAt: Date;
}
