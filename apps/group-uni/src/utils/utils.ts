import dayjs from 'dayjs'; // 导入插件
import LocalizedFormat from 'dayjs/plugin/LocalizedFormat';

dayjs.extend(LocalizedFormat);

export function startAtFormat(dataString?: string) {
    if (!dataString) return;
    return dayjs(dataString).format('L').substring(0, 5) + ',' + dayjs(dataString).format('LT');

    // const timer = new Date(Date.parse(dataString));
    // return timer.toLocaleString([], {month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
}

export const sleep = (delay: number = 1000) => new Promise((resolve) => setTimeout(resolve, delay));
