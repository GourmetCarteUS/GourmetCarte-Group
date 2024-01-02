import Wechat from 'group-wechat';

export const wechat = new Wechat({
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
});
