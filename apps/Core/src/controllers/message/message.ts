import { wechat } from '../../wechat';

interface MessageData {
    touser: string;
    title?: string;
    startAt?: string;
    remark?: string;
    location?: string;
    distance?: string; // 距离开始时间
    eventId?: string;
}

// 1. 活动进度提醒 HtYFXDb6S8yLYOG1r4oGQGdjMiYOPVeFKuZISGNU7zY
// 2. 活动参加人数 whvZi7swOrbC1TqXmz4Yr3zh9JhmbH-ruDkc3CAlrU0
export function sendMessage(type: number, data: MessageData) {
    let messages = {
        touser: data.touser, //给某用户推送的openid，这个得你获取到用户的openid，才可以进行推送
        miniprogram_state: 'developer', //developer为开发版；trial为体验版；formal为正式版；默认为正式版
        page: `pages/post/detail?id=${data.eventId}`,
    };
    if (type === 1) {
        messages['template_id'] = 'HtYFXDb6S8yLYOG1r4oGQGdjMiYOPVeFKuZISGNU7zY';
        messages['data'] = {
            thing1: {
                value: data.title,
            },
            time2: {
                value: data.startAt,
            },
            thing4: {
                value: '距离活动开始还有7天',
            },
            thing5: {
                value: '活动即将开始，请确保准时参加。',
            },
        };
    } else if (type === 2) {
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
