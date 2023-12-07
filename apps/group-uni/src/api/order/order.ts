import { request } from "@/utils/http";
import {
  GeneralPageArrayResponse,
  GeneralResponse,
  OrderCreateModel,
  OrderDetailModel,
  OrderListModel,
  OrderPayModel,
  PageParams,
} from "cincore-common";

export function order_create(data: Partial<OrderCreateModel>) {
  return request.post<GeneralResponse<OrderPayModel>>(
    "/member/order/create",
    data,
  );
}

// 状态: obligation(待支付) run(进行中) complete(已完成) afterSales(售后/退款) finish(结束) all(权柄)
export function view_order_list(params: PageParams) {
  return request.get<GeneralPageArrayResponse<OrderDetailModel>>(
    "/member/order/list",
    { params: params },
  );
}

export function view_order_detail(id: string) {
  return request.get<GeneralPageArrayResponse<OrderDetailModel>>(
    "/member/order/detail",
    { params: { id } },
  );
}

export function view_order_cancel(id: string) {
  return request.put<GeneralPageArrayResponse<{}>>("/member/order/cancel", {
    id,
  });
}

export function view_order_refund(data: {
  id: number | string;
  amount: string;
  reason?: string;
}) {
  return request.post<GeneralPageArrayResponse<{}>>(
    "/member/order/refund",
    data,
  );
}

export function view_order_open(id: string | number) {
  return request.put<GeneralPageArrayResponse<{}>>("/member/order/open/room", {
    id,
  });
}
