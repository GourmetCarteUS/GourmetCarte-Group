import { CronJob } from 'cron';
import { Event } from '../models/Event';
import '../app-data-source';
import dayjs from 'dayjs';
import { And, LessThanOrEqual, MoreThan } from 'typeorm';

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
            select: ['id', 'startAt', 'participants', 'title'],
            relations: { participants: true },
        });

        events.map((event) => {
            const hour = Math.abs(dayjs().diff(event.startAt, 'hour'));
            let messages = {
                touser: '',
                startAt: dayjs(event.startAt).format('YYYY-MM-DD HH:mm:ss'),
                title: event.title,
                eventId: event.id,
                distance: `距离活动开始还有${hour}小时`,
            };

            event.participants.map((user) => {
                messages.touser = user.id;
                // sendMessage(1, messages);
                console.log(1, messages);
            });
        });

        // if (hour <= 48 && hour > 24) {
        //
        // } else if (hour <= 24 && hour > 8) {
        //
        // } else if (hour <= 1 && hour > 8) {
        //
        // }
    }, // onTick
    null, // onComplete
    false, // start
    'America/Los_Angeles' // timeZone
);
