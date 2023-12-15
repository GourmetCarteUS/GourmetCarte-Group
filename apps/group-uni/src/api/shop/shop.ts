import { request } from '@/utils/http';
import { UnData, UnResponse } from '@uni-helper/uni-network';

import { ShopDto, GeneralPageArrayResponse, GeneralResponse, CreateShopModel, RoomDto, UserShopListModel, UserRoomListModel, UserShopOptions, MeiTuanCoupon } from 'group-common';

/**
 * 信息
 */
export interface RoomDetailModel {
    /**
     * 是否续单
     */
    isContinuation: boolean;
    room: UserRoomListModel;
    shop: CreateShopModel;
}

export function view_room_list(dto?: RoomDto): Promise<Required<UnResponse<GeneralPageArrayResponse<UserRoomListModel>, UnData>>> {
    return request.get<GeneralPageArrayResponse<UserRoomListModel>>('/common/room/list', {
        params: dto,
    });
}

export function view_room_detail(id: string) {
    return request.get<GeneralPageArrayResponse<RoomDetailModel>>('/member/room/detail', {
        params: { id },
    });
}

export function view_shop_list(dto?: ShopDto): Promise<Required<UnResponse<GeneralPageArrayResponse<UserShopListModel>, UnData>>> {
    return request.get<GeneralPageArrayResponse<UserShopListModel>>('/common/shop/list', {
        params: dto,
    });
}

export function view_shop_all(): Promise<Required<UnResponse<GeneralPageArrayResponse<UserShopOptions>, UnData>>> {
    return request.get<GeneralPageArrayResponse<UserShopOptions>>('/common/shop/all');
}

export function view_shop(id: string): Promise<Required<UnResponse<GeneralResponse<CreateShopModel>, UnData>>> {
    return request.get<GeneralResponse<CreateShopModel>>('/common/shop/detail', {
        params: { id },
    });
}

export function view_check_coupon(params: { payIdentifying: string; roomId: string }) {
    return request.get<GeneralResponse<MeiTuanCoupon>>('/member/order/check/quan', { params });
}
