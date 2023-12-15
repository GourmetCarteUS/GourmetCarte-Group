import { request } from '@/utils/http';
import { UnData, UnResponse } from '@uni-helper/uni-network';
import { GeneralPageArrayResponse, StationDetailModel } from 'cincore-common';

export function view_station_detail(params: { type: string; value: string }): Promise<Required<UnResponse<GeneralPageArrayResponse<StationDetailModel>, UnData>>> {
    return request.get<StationDetailModel>('/member/chargeStation/detail', {
        params: params,
    });
}
