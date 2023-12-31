import type { RouteLocationRaw } from 'uni-mini-router';
import useTokenStorage from '@/storage/token';
import { router } from '@/router';
import { useUserInfoStore } from '@/state/modules/user-info';

export function onGoPage(params: RouteLocationRaw, needLogged = true) {
    if (!needLogged) return router.push(params);

    if (!useTokenStorage.getToken())
        return router.push({
            name: 'login',
            params: { redirect: JSON.stringify(params) },
        });

    return router.push(params);
}

export function onGoReplace(params: RouteLocationRaw, needLogged = true) {
    if (!needLogged) return router.replace(params);
    if (!useTokenStorage.getToken())
        return router.push({
            name: 'login',
            params: { redirect: JSON.stringify(params) },
        });
    return router.replace(params);
}

export async function isLogged() {
    if (!useTokenStorage.getToken() || !(await useUserInfoStore().getUserInfo())) {
        router.push({ name: 'login' });
        return false;
    }
    return true;
}

export function onBack() {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1]; //当前页面
    let prevPage = pages[pages.length - 2]; //上一个页面
    //判断上一页是否为首页，如果是就直接返回首页
    if (!prevPage) {
        router.pushTab({ name: 'main' });
        return;
    }
    return router.back();
}

export function onGoTab(params: RouteLocationRaw, needLogged = true) {
    if (!needLogged) return router.pushTab(params);
    if (!useTokenStorage.getToken())
        return router.push({
            name: 'login',
            params: { tab: JSON.stringify(params) },
        });
    return router.pushTab(params);
}

export function getCurrentPageUrl() {
    const cur = getCurrentPages() as any;
    const currentPagePath = cur.slice(-1)[0]?.['name'] ?? '/pages/open/open';
    const currentPageParams = cur.slice(-1)[0]?.['options'] ?? {};
    return currentPagePath + '?' + currentPageParams;
}

export function getUrlParams(urlString: string, name: string) {
    let params = urlString.split('?')[1]; // 获取?号后面的参数 name=mick&age=20
    if (!params) return null; // 如果无参，返回null
    let vars = params.split('&'); // 将参数分割成数组 ['name=mick', 'age=20']
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('='); // 将参数的key和值进行分割成 ['name', 'mick']
        let key = decodeURIComponent(pair[0]); // 参数key
        let value = decodeURIComponent(pair[1]); // 参数值
        if (name === key) {
            // 如果匹配到对应key返回
            return value;
        }
    }
    return null;
}
