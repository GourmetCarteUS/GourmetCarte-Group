import { request } from '@/utils/http';
import { InspectionMailboxRes, MailBoxDetailRes, MailboxLisDto, MailboxListRes, PutMailboxDto } from '@/api/mail-box/mail-box.types';
import { UnData, UnResponse } from '@uni-helper/uni-network';
import { HttpResponseData } from '@/utils/http/un';

export function put_mailbox(dto: PutMailboxDto): Promise<Required<UnResponse<HttpResponseData<{ id: string }>, UnData>>> {
    return request.post<{ id: string }>('/mailbox/put', dto);
}

export function delete_mailbox(id: string): Promise<Required<UnResponse<HttpResponseData<MailBoxDetailRes>, UnData>>> {
    return request.get('/mailbox/delete', { params: { id } });
}

export function open_mailbox(id: string, password?: string): Promise<Required<UnResponse<HttpResponseData<MailBoxDetailRes>, UnData>>> {
    return request.post<MailBoxDetailRes>('/mailbox/open', { id, password });
}

export function put_mailbox_list(dto?: MailboxLisDto): Promise<Required<UnResponse<HttpResponseData<MailboxListRes>, UnData>>> {
    return request.get<MailboxListRes>('/mailbox/put/list', { params: dto });
}

export function open_mailbox_list(dto?: MailboxLisDto): Promise<Required<UnResponse<HttpResponseData<MailboxListRes>, UnData>>> {
    return request.get<MailboxListRes>('/mailbox/open/list', { params: dto });
}

export function view_mailbox_list(dto?: MailboxLisDto): Promise<Required<UnResponse<HttpResponseData<MailboxListRes>, UnData>>> {
    return request.get<MailboxListRes>('/mailbox/view/list', { params: dto });
}

export function mailbox_inspection(id: string): Promise<Required<UnResponse<HttpResponseData<InspectionMailboxRes>>>> {
    return request.get<InspectionMailboxRes>('/mailbox/inspection', {
        params: { id },
    });
}

export function mailbox_detail(id: string): Promise<Required<UnResponse<HttpResponseData<MailBoxDetailRes>>>> {
    return request.get<MailBoxDetailRes>('/mailbox/detail', { params: { id } });
}
