import { getEnvValue } from '@/utils/env';
import useTokenStorage from '@/storage/token';
import { hideLoading, toast } from '@/utils/uniapi/prompt';
import un from '@uni-helper/uni-network';
import type { UnResponse } from '@uni-helper/uni-network';
import type { CustomUnConfig, HttpResponseData, UnInstanceCustom } from './un';
import { refresh_token } from '@/api/common/common';
import { transformHttpStatusMessage } from '@/utils/http/checkStatus';
import { router } from '@/router';
import { GCJSONResponse } from 'group-common';

const instance = un.create({
    baseUrl: getEnvValue('VITE_API_BASE_URL'),
    headers: {
        'content-type': 'application/json',
    },
    sslVerify: false,
    enableCache: false,
});

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        if (!config?.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${useTokenStorage.getToken()?.token ?? ''}`;
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    },
    {
        synchronous: true,
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        const status = response.status;
        if (!status || !Number(status) || !/^2/.test(String(status))) {
            throw new Error(response.errMsg || '服务器请求失败');
        }
        // 2xx 范围内的状态码都会触发该函数
        // 对响应数据做点什么
        const responseCustom = response as Required<UnResponse<HttpResponseData | string>>;
        const config = (responseCustom.config || {}) as CustomUnConfig;
        const returnData = responseCustom.data as HttpResponseData;
        // 刷新token
        if (!config.disableRefreshToken && useTokenStorage.isTokenExpire(returnData._)) {
            setTimeout(async () => {
                try {
                    const resToken = await refresh_token();
                    resToken.data && useTokenStorage.setToken(resToken.data);
                } catch (e: any) {}
            }, 0);
        }
        // 下载处理
        if (responseCustom.tempFilePath) {
        }
        // 上传处理
        if (config.name === 'file' && config.filePath && typeof responseCustom.data === 'string') {
            responseCustom.data = JSON.parse(responseCustom.data);
        }

        return responseCustom;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数
        // 对响应错误做点什么
        const code = error.response.status || error.response?.data?.code;
        const message = transformHttpStatusMessage(code, error.response?.data?.message ?? error.message);
        if (error.response.status == 401) router.push({ name: 'login' });
        try {
            hideLoading();
        } catch (e) {}

        toast(message);

        return Promise.reject(error);
    }
);

export const request = instance;
