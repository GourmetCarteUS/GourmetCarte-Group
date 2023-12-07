export type PageDto<T = unknown> = {
  page_index?: number;
  page_size?: number;
} & T;

export type PageRes<T = unknown> = {
  items: T[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export interface FileRes {
  id: string;
  name?: string;
  origin?: string;
  url: string;
}

export enum FilePathTypeEnum {
  MailboxAvatar = "MailboxAvatar",
  MailboxImg = "MailboxImg",
}
