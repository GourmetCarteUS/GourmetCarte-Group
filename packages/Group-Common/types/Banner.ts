export interface IBanner {
    id: string;
    name?: string;
    sort?: number;
    imgUrl: string;
    show: boolean;
    link?: string; // 跳转地址

    createdAt: Date;
    updatedAt: Date;
}
