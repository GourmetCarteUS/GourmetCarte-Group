export interface IUser {
    id: string;
    displayName: string;
    openId?: string;
    unionId?: string;
    avatarUrl?: string;
    contact?: string;

    createdAt: Date;
    updatedAt: Date;
}
