import { request } from '@/utils/http';
import { IEvent, GCJSONResponse, GCJSONArrayResponse, ICategory, IBanner, GCJSONPaginationResponse, EventForm, EventDetailData, EventCreateForm } from 'group-common';
import dayjs from 'dayjs';

export function edit_create_event(data: Partial<EventCreateForm>) {
    return request.post<GCJSONResponse<IEvent>>('/event', {
        title: data.title || undefined,
        placeId: data.placeId || undefined,
        geoLocation: data.geoLocation || undefined,
        location: data.location || undefined,
        description: data.description || undefined,
        startAt: data.startAt || undefined,
        maxParticipants: data.maxParticipants || undefined,
        imageDescription: data.imageDescription || undefined,
        groupQr: data.groupQr || undefined,
        city: data.city || undefined,
        isPublic: data.isPublic || undefined,
        categoryIds: data?.categoryIds || undefined,
    });
}

export function edit_modify_event(data: Partial<EventCreateForm>) {
    console.log('data', data);
    return request.put<GCJSONResponse<IEvent>>('/event', {
        id: data.id,
        isPublic: data?.isPublic,
        title: data.title || undefined,
        geoLocation: data.geoLocation || undefined,
        location: data.location || undefined,
        description: data.description || undefined,
        startAt: data.startAt || undefined,
        maxParticipants: data.maxParticipants || undefined,
        imageDescription: data.imageDescription || undefined,
        groupQr: data.groupQr || undefined,
        city: data.city || undefined,
        categoryIds: data?.categoryIds || undefined,
    });
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
    return request.get<GCJSONPaginationResponse<IEvent>>('/event', { params: data });
}

export function edit_event_join(id: string) {
    return request.post<GCJSONResponse<IEvent>>(`event/join/${id}`);
}

export function edit_event_quit(id: string) {
    return request.post<GCJSONResponse<IEvent>>(`event/quit/${id}`);
}

export function view_event_user(data: Partial<EventForm>) {
    return request.get<GCJSONResponse<IEvent>>(`event/user/${data.userId}`, { params: data });
}

export function edit_event_cancel(id: string) {
    return request.post<GCJSONResponse<Boolean>>(`event/cancel/${id}`);
}
