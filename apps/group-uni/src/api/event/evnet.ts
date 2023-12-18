import { request } from '@/utils/http';
import {IEvent, GCJSONResponse, GCJSONArrayResponse, ICategory} from 'group-common'
export function view_event_create(data: Partial<IEvent>) {
    return request.post<GCJSONResponse<IEvent>>('/event', data);
}

export function view_categories() {
    return request.get<GCJSONArrayResponse<ICategory>>('/category');
}