// 重写un类型

import {
  Un,
  UnConfig,
  UnData,
  UnInstance,
  UnResponse,
} from "@uni-helper/uni-network";

interface HttpResponseData<T = unknown> {
  code: number;
  data: T;
  message: string;
  msg: string;
  _: number; // 服务器时间戳（s）
}

interface CustomUnConfig<T = UnData, D = UnData> extends UnConfig<T, D> {
  disableRefreshToken?: boolean;
}

interface UnCustom<T = UnData, D = UnData> {
  request<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    config: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  download<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    config: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  upload<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    config: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  get<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  delete<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  head<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  options<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  trace<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  connect<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  post<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    data?: DD,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  put<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    data?: DD,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  patch<TT = T, DD = D, R = Required<UnResponse<TT>, DD>>(
    url: string,
    data?: DD,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
}

declare class UnCustom<T = UnData, D = UnData> extends Un<T, D> {}

interface UnInstanceCustom<T = UnData, D = UnData> extends UnCustom<T, D> {
  <TT = T, DD = D, R = UnResponse<TT, DD>>(
    config: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  <TT = T, DD = D, R = Required<UnResponse<HttpResponseData<TT>, DD>>>(
    url: string,
    config?: CustomUnConfig<TT, DD>,
  ): Promise<R>;
  defaults: CustomUnConfig<T, D>;
}

export { HttpResponseData, CustomUnConfig, UnCustom, UnInstanceCustom };
