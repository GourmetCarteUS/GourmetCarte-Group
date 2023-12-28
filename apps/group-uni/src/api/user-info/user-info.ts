import { request } from '@/utils/http';
import { Authentication, GCJSONResponse, IUser } from 'group-common';

export function user_info() {
    return request.get<GCJSONResponse<IUser>>('/user/profile');
}

export function modify_user_info(data: Partial<IUser>) {
    return request.patch('/user', data);
}

export function user_login(code: string) {
    return request.post<GCJSONResponse<Authentication>>('/user/login', { code });
}
