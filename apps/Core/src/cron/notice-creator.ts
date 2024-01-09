import { CronJob } from 'cron';
import { Event } from '../models/Event';
import '../app-data-source';
import dayjs from 'dayjs';
import { And, LessThanOrEqual, MoreThan } from 'typeorm';
import { saveCacheAndSendMessage } from '../controllers/message/message';

export const noticeCreatorJob = new CronJob(
    '* * 0/1 * * ? *', // cronTime
    async function () {
        console.log('You will see this message every 1 hour');

        const twoDaysLater = dayjs().add(2, 'day');
        const oneHourLater = dayjs().add(1, 'hour');

        let where = {
            disable: false,
            startAt: And(MoreThan(oneHourLater.toDate()), LessThanOrEqual(twoDaysLater.toDate())),
        };

        const events = await Event.find({
            where,
            select: ['id', 'startAt', 'participants', 'title', 'creator'],
            relations: { participants: true, creator: true },
        });

        events.map((event) => {
            let hourKey = undefined;
            const hour = Math.ceil(Math.abs(dayjs().diff(event.startAt, 'hour', true)));

            if (hour <= 48 && hour > 24) {
                hourKey = 48;
            } else if (hour <= 24 && hour > 8) {
                hourKey = 24;
            } else if (hour <= 8 && hour > 1) {
                hourKey = 8;
            } else if (hour < 1 && hour > 0) {
                hourKey = 1;
            }

            if (!hourKey) return;

            let messages = {
                touser: '',
                startAt: dayjs(event.startAt).format('YYYY-MM-DD HH:mm:ss'),
                title: event.title,
                eventId: event.id,
                distance: `距离活动开始还有${hour}小时`,
                type: 1,
            };

            if (event.creator.id && !event.participants.find((user) => user.id == event.creator.id)) {
                const creatorKey = `eventStart-${event.id}-${event.creator.id}-${hourKey}`;
                messages.touser = event.creator.openId;
                saveCacheAndSendMessage(creatorKey, messages);
            }

            event.participants.map((user) => {
                const participantKey = `eventStart-${event.id}-${user.id}-${hourKey}`;
                messages.touser = user.openId;
                saveCacheAndSendMessage(participantKey, messages);
            });
        });
    }, // onTick
    null, // onComplete
    false, // start
    'America/Los_Angeles' // timeZone
);
