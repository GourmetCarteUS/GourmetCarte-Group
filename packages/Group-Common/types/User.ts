export interface IUser {
    id: string;
    displayName: string;
    openId?: string;
    unionId?: string;
    avatarUrl?: string;

    createdAt: Date;
    updatedAt: Date;
}
