import { request } from '@/utils/http';
import { UserInfo } from '@/api/user-info/user-info.types';
import { GeneralResponse } from 'cincore-common';

export function user_info() {
    return request.get<UserInfo>('/member/user/detail');
}

export function modify_user_info(data: Partial<UserInfo>) {
    return request.post('/member/user/update', data);
}

export function getUserPhone(code: string) {
    return request.post<
        GeneralResponse<{
            countryCode: string;
            phoneNumber: string;
            purePhoneNumber: string;
        }>
    >('/common/member/wechatPhone', { code });
}
