import { CronJob } from 'cron';
import { Event } from '../models/Event';
import '../app-data-source';

export const testJob = new CronJob(
    '0,10,20,30,40,50 * * * * *', // cronTime
    async function () {
        console.log('You will see this message every 10s');

        const events = await Event.find({
            // where,
            select: ['id', 'title', 'category', 'startAt', 'imageDescription', 'joinCount', 'maxParticipants', 'viewCount'],
            // order,
            // skip,
            // take,
        });

        console.log(events.map((e) => e.title));
    }, // onTick
    null, // onComplete
    false, // start
    'America/Los_Angeles' // timeZone
);
