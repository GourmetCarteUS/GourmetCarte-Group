import dayjs from 'dayjs';

/**
 * @param key 键
 * @param data 值
 * @param expires 有效时间，expires以秒为单位，且为正整数
 */
export function setStorageSync(key: string, data: any, expires: number) {
    //未传递有效时间，直接使用原存储方法:
    if (!expires) {
        return uni.setStorageSync(key, data);
    }
    //传递有效时间，使用改写后的方法：1秒 === 1000毫秒
    let reg = /^\d+$/;
    if (reg) {
        //得到增加秒后的结果（到期时间）：
        let dateStr = dayjs().add(expires, 'seconds').format('YYYY-MM-DD HH:mm:ss');
        //存储：
        uni.setStorageSync(key, { data, expires: dateStr });
    }
}

export function getStorageSync(key: string) {
    //根据key获取存储的数据：
    const data = uni.getStorageSync(key);
    //判断是否设置有效期：
    if (typeof data !== 'object' || (typeof data === 'object' && !data.expires)) return data;
    //获取有效期到期的时间：
    if (dayjs().isBefore(data.expires)) {
        //未过期
        return data.data;
    } else {
        //已过期
        uni.removeStorageSync(key);
        return '';
    }
}
