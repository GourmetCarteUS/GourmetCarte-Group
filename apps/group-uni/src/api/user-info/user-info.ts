import {request} from '@/utils/http';
import {IUser} from 'group-common';

export function user_info() {
    return request.get<IUser>('/user/profile');
}

export function modify_user_info(data: Partial<IUser>) {
    return request.post('/member/user/update', data);
}

export function getUserLogin(code: string) {
    return request.post('/user/login', {code});
}
