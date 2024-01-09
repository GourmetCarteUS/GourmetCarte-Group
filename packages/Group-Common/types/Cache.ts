export interface ICache {
    id: string;
    key: string;
    value?: string;
    expiry?: Date;

    createdAt?: Date;
    updatedAt?: Date;
}
