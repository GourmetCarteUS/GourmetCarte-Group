import { request } from '@/utils/http';
import type { Token } from '@/storage/token';
import type { FilePathTypeEnum, FileRes } from '@/api/common/common.types';
import { GCJSONResponse } from 'group-common';

export function refresh_token() {
    return request.post<Token>(
        '/mailbox/user/refresh-token',
        {},
        {
            disableRefreshToken: true,
        }
    );
}

export function upload_file(filePath: string, pathType?: FilePathTypeEnum) {
    return request.upload<GCJSONResponse<string>>({
        url: '/upload/image',
        name: 'file',
        filePath: filePath,
        fileType: 'image', // image, video, audio
        formData: {
            pathType,
        },
    });
}
