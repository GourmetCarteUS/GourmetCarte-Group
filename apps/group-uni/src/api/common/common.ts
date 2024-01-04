import { request } from '@/utils/http';
import { GCJSONResponse, Authentication, GCJSONArrayResponse } from 'group-common';
import { GoogleNormalizedPlace } from 'grouping-core/src/utils/GoogleMap';

export function refresh_token() {
    return request.post<Authentication>(
        '/mailbox/user/refresh-token',
        {},
        {
            disableRefreshToken: true,
        }
    );
}

export function upload_file(filePath: string) {
    return request.upload<GCJSONResponse<string>>({
        url: '/upload/image',
        name: 'file',
        filePath: filePath,
        fileType: 'image', // image, video, audio
        formData: {},
    });
}

export function location_autocomplete(input: string) {
    return request.get<GCJSONArrayResponse<GoogleNormalizedPlace>>('/location/autocomplete', { params: { input } });
}
