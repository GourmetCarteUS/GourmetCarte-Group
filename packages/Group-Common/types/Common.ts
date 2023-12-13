import { PaginationModel } from 'mongoose-paginate-ts';

export type LocationType = [number, number];

interface GCJSONResponseBase {
    success: boolean;
    errorMessage?: string;
    errorCode?: number | string;
}

export interface GCJSONResponse<T> extends GCJSONResponseBase {
    data?: T;
}

export interface GCJSONArrayResponse<T> extends GCJSONResponseBase {
    data?: T[];
}

export interface GCJSONPaginationResponse<T>
    extends GCJSONResponseBase,
        Omit<PaginationModel<T>, 'docs'> {
    data?: T[];
}
