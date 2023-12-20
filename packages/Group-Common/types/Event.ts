import {IUser} from './User';
import {ICategory} from "./Category";
import {GCPageRequest} from "./Common";

export interface IEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    geoLocation: string;
    startAt: Date;
    creator: IUser;
    category?: ICategory[];
    maxParticipants: number;
    imageDescription: string[];
    disable: boolean;
    groupQr: string;
    viewCount: number;

    participants: IUser[];

    createdAt: Date;
    updatedAt: Date;
    joinCount: number;
}

export interface EventDetailData extends IEvent {
    isJoin?: boolean;
    isMe?: boolean;
}

export interface EventCreateForm extends IEvent {
    categoryIds: string[];
    categoryStr?: string[];
}

export interface EventForm extends GCPageRequest {
    categoryId?: string
    userId?: string
}