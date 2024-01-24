import { Cache } from '../../models/Cache';
import { wechat } from '../../wechat';

interface MessageData {
    touser: string;
    title?: string;
    startAt?: string;
    remark?: string;
    location?: string;
    distance?: string; // 距离开始时间
    eventId?: string;
    type: number;
}

// 1. 活动进度提醒 HtYFXDb6S8yLYOG1r4oGQGdjMiYOPVeFKuZISGNU7zY
// 2. 活动参加人数 whvZi7swOrbC1TqXmz4Yr3zh9JhmbH-ruDkc3CAlrU0
// 3. 活动更新提醒

const miniprogram_state = process.env.ENV_VERSION == 'develop' ? 'developer' : process.env.ENV_VERSION == 'trial' ? 'trial' : 'formal';

export function sendMessage(data: MessageData) {
    let messages = {
        touser: data.touser, //给某用户推送的openid，这个得你获取到用户的openid，才可以进行推送
        // develop，trial体验版 release正式版
        miniprogram_state, //developer为开发版；trial为体验版；formal为正式版；默认为正式版
        page: `pages/post/detail?id=${data.eventId}`,
    };
    if (data.type === 1) {
        messages['template_id'] = 'HtYFXDb6S8yLYOG1r4oGQGdjMiYOPVeFKuZISGNU7zY';
        messages['data'] = {
            thing1: {
                value: data.title,
            },
            time2: {
                value: data.startAt,
            },
            thing4: {
                value: data.distance,
            },
            thing5: {
                value: '活动即将开始，请确保准时参加。',
            },
        };
    } else if (data.type === 2) {
        messages['template_id'] = 'whvZi7swOrbC1TqXmz4Yr3zh9JhmbH-ruDkc3CAlrU0';
        messages['data'] = {
            thing1: {
                value: data.title,
            },
            time3: {
                value: data.startAt,
            },
            thing2: {
                value: data.location,
            },
            thing4: {
                value: data?.remark,
            },
        };
    } else if (data.type === 3) {
        messages['template_id'] = '7V7vb2dVYBhLefYm_ohSSJXtJ4adONn8P0INXxglexA';
        messages['data'] = {
            thing1: {
                value: data.title,
            },
            thing2: {
                value: data.location,
            },
            time3: {
                value: data.startAt,
            },
            thing4: {
                value: data?.remark,
            },
        };
    }

    wechat['sendSubscribeMessage'](messages)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err, messages);
        });

    return {
        success: true,
        data: '1.0',
    };
}

export async function saveCacheAndSendMessage(key: string, messages: any) {
    const hasCache = await Cache.findOneBy({ key });
    if (hasCache) return;
    const cache = new Cache();
    cache.key = key;
    await cache.save();
    sendMessage(messages);
}
