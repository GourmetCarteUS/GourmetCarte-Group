import { request } from '@/utils/http';
import type { Token } from '@/storage/token';
import type { FilePathTypeEnum, FileRes } from '@/api/common/common.types';

export function weixin_login(code: string, phone?: string) {
    return request.post<Token>(
        '/common/member/login',
        { code, phone },
        {
            disableRefreshToken: true,
        }
    );
}

export function refresh_token() {
    return request.post<Token>(
        '/mailbox/user/refresh-token',
        {},
        {
            disableRefreshToken: true,
        }
    );
}

export function upload_file(filePath: string, pathType: FilePathTypeEnum) {
    return request.upload<FileRes>({
        url: '/member/upload/image',
        name: 'image',
        filePath: filePath,
        fileType: 'image', // image, video, audio
        formData: {
            pathType,
        },
    });
}
