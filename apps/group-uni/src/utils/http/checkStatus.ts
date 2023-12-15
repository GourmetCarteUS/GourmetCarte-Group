export function transformHttpStatusMessage(status: number, msg: string = ''): string {
    let errMessage = msg;
    switch (status) {
        case 400:
            errMessage = errMessage || `${msg}`;
            break;
        case 401:
            errMessage = '登录已失效，请重新登录';
            break;
        case 403:
            errMessage = errMessage || '不存在的资源';
            break;
        case 404:
            errMessage = errMessage || '网络请求错误,未找到该资源';
            break;
        case 405:
            errMessage = errMessage || '网络请求错误,请求方法未允许';
            break;
        case 408:
            errMessage = errMessage || '网络请求超时';
            break;
        case 500:
            errMessage = errMessage || '服务器错误';
            break;
        case 501:
            errMessage = errMessage || '网络未实现';
            break;
        case 502:
            errMessage = errMessage || '服务不可用';
            break;
        case 503:
            errMessage = errMessage || '服务不可用';
            break;
        case 504:
            errMessage = errMessage || '网络超时';
            break;
        case 505:
            errMessage = errMessage || 'http版本不支持该请求';
            break;
        default:
    }

    return errMessage;
}
