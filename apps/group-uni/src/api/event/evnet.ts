import {request} from '@/utils/http';
import {
    IEvent,
    GCJSONResponse,
    GCJSONArrayResponse,
    ICategory,
    IBanner,
    GCJSONPaginationResponse,
    EventForm, EventDetailData
} from 'group-common'

export function view_event_create(data: Partial<IEvent>) {
    return request.post<GCJSONResponse<IEvent>>('/event', data);
}

export function view_event_detail(id: string) {
    return request.get<GCJSONResponse<EventDetailData>>(`/event/${id}`);
}

export function view_event_success(id: string) {
    return request.get<GCJSONResponse<EventDetailData>>(`/event/success/${id}`);
}

export function view_categories() {
    return request.get<GCJSONArrayResponse<ICategory>>('/category');
}

export function view_banner() {
    return request.get<GCJSONArrayResponse<IBanner>>('/banner');
}

export function view_events(data: Partial<EventForm>) {
    return request.get<GCJSONPaginationResponse<IEvent>>('/event', {params: data});
}

export function view_event_join(id: string) {
    return request.post<GCJSONResponse<IEvent>>(`event/join/${id}`)
}

export function view_event_quit(id: string) {
    return request.post<GCJSONResponse<IEvent>>(`event/quit/${id}`)
}

export function view_event_user(data: Partial<EventForm>) {
    return request.get<GCJSONResponse<IEvent>>(`event/user/${data.userId}`, {params: data})
}