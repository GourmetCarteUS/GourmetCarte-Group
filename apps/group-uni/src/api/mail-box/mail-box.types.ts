import { FileRes, PageDto, PageRes } from "@/api/common/common.types";

export interface PutMailboxDto {
  id?: string;
  title: string;
  content?: string;
  desc?: string;
  picture?: string[];
  publish_at: string;
  password?: string;
  is_group: boolean;
}

export type MailboxLisDto = PageDto<{
  id?: string;
  title?: string;
  publish_at?: string;
  is_password?: boolean;
  is_group?: boolean;
}>;

export type MailboxListRes = PageRes<{
  id: string;
  title: string;
  publish_at: string;
  is_group: boolean;
  is_password: boolean;
  open_count?: number;
  create_time: string;
}>;

export interface InspectionMailboxRes {
  title: string;
  desc: string;
  publish_at: string;
  is_password: boolean;
  is_open: boolean;
  is_group_limit: boolean;
  creator: {
    id: string;
    avatar: string;
    name: string;
  };
}

export type MailBoxDetailRes = {
  id: string;
  title: string;
  content: string;
  desc: string;
  publish_at: string;
  is_group: boolean;
  picture: FileRes[];
  password: string;
  creator: {
    id: string;
    avatar: string;
    name: string;
  };
  users?: {
    id: string;
    avatar: string;
    name: string;
  }[];
};
