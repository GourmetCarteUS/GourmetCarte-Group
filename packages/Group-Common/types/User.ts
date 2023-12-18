export interface IUser {
    id: string;
    displayName: string;
    openId?: string;
    unionId?: string;
    avatarUrl?: string;
    phoneNumber?: string;
    joinNumber?: number;
    postNumber?: number;

    createdAt: Date;
    updatedAt: Date;
}
