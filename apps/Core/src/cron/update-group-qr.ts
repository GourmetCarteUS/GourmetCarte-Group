import { CronJob } from 'cron';
import { Event } from '../models/Event';
import '../app-data-source';
import dayjs from 'dayjs';
import { LessThanOrEqual, MoreThan } from 'typeorm';
import { saveCacheAndSendMessage } from '../controllers/message/message';

export const updateGroupQrJob = new CronJob(
    '* * * 1/1 * ? ', // cronTime
    async function () {
        console.log('You will see this message every 1 day');

        let where = {
            disable: false,
            startAt: MoreThan(dayjs().add(1, 'day').toDate()), // 开始时间大于1天
            updatedAt: LessThanOrEqual(dayjs().subtract(6, 'day').toDate()), // 并且最后更新时间小于6天
        };

        const events = await Event.find({
            where,
            select: ['id', 'startAt', 'title', 'creator', 'updatedAt'],
            relations: {
                creator: true,
            },
        });

        events.map((event) => {
            const day = Math.ceil(Math.abs(dayjs().diff(event.updatedAt, 'day', true)));
            let messages = {
                touser: event.creator.openId,
                startAt: dayjs(event.startAt).format('YYYY-MM-DD HH:mm:ss'),
                title: event.title,
                eventId: event.id,
                remark: `群二维码上传已经超过${day}天了，请及时更新`,
                type: 3,
            };

            const creatorKey = `updateQr-${event.id}-${event.creator.openId}-${event.groupQr}`;
            saveCacheAndSendMessage(creatorKey, messages);
            // console.log(creatorKey, messages)
        });
    }, // onTick
    null, // onComplete
    false, // start
    'America/Los_Angeles' // timeZone
);
