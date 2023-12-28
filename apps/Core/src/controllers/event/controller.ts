import { EventCreateForm, EventDetailData, GCJSONArrayResponse, GCJSONResponse, IEvent } from 'group-common';
import { Body, Controller, Get, Path, Post, Put, Request, Route, Security, Tags } from 'tsoa';
import { Event } from '../../models/Event';
import { Category } from '../../models/Category';
import { Between, FindOptionsOrder, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { User } from '../../models/User';
import dayjs from 'dayjs';

@Tags('Event')
@Route('event')
export class EventController extends Controller {
    @Get()
    public async getEvents(@Request() request: any): Promise<GCJSONArrayResponse<IEvent>> {
        const take = request.query?.limit || 10;
        const skip = ((request.query?.page || 1) - 1) * take;

        let order: FindOptionsOrder<Event> = {
            startAt: 'asc',
        };
        let where = {
            disable: false,
            isPublic: true,
        };
        if (request.query?.category) {
            if (request.query?.category == 'all') {
            } else if (request.query?.category == 'hot') {
                order['viewCount'] = 'DESC';
            } else {
                const category = new Category();
                category.id = request.query?.category;
                where['category'] = category;
            }
        }
        if (request.query?.city && request.query?.city != 'All') {
            where['city'] = request.query.city;
        }

        if (request.query?.data) {
            let data = request.query?.data.split(',');
            if (data[0] == data[1]) {
                data[1] = dayjs(data[1]).add(1, 'day').format('YYYY-MM-DD').toString();
            }
            where['startAt'] = Between(data[0], data[1]);
        } else {
            where['startAt'] = MoreThanOrEqual(new Date());
        }

        const events = await Event.find({
            where,
            select: ['id', 'title', 'category', 'startAt', 'imageDescription', 'joinCount', 'maxParticipants', 'viewCount'],
            order,
            skip,
            take,
        });

        return {
            success: true,
            data: events,
        };
    }

    @Get(':id')
    public async getEvent(@Request() request: any, id: string): Promise<GCJSONResponse<EventDetailData>> {
        const event = await Event.findOne({
            where: { id, disable: false },
            select: [
                'id',
                'title',
                'description',
                'geoLocation',
                'viewCount',
                'maxParticipants',
                'creator',
                'location',
                'participants',
                'startAt',
                'imageDescription',
                'joinCount',
                'isPublic',
                'groupQr',
                'category',
            ],
            relations: {
                creator: true,
                participants: true,
                category: true,
            },
        });
        const currentUser = request.user;

        if (event) {
            const participants = event.participants;
            if (event.joinCount != participants?.length) {
                event.joinCount = participants?.length;
            }
            if (request?.isLogin) {
                const isMe = currentUser.id == event.creator.id;
                event['isMe'] = isMe;
                if (!isMe) {
                    event.viewCount += 1;
                }

                event['isJoin'] = !!participants.find((id) => currentUser.id);
            }
            await event.save();
        }

        const now = dayjs();
        // 活动是否结束，当前时间在开始之间之后就变为已结束
        event['status'] = now.isAfter(event.startAt);

        return {
            success: true,
            data: event,
        };
    }

    @Get('success/{id}')
    @Security('authorized')
    public async getSuccessEvent(@Request() request: any, id: string): Promise<GCJSONResponse<EventDetailData>> {
        const user = new User();
        user.id = request.user.id;
        const where = { id, participants: user };
        const event = await Event.findOne({
            // @ts-ignore
            where,
            relations: {
                participants: true,
            },
            select: ['id', 'title', 'groupQr', 'participants'],
        });

        return {
            success: true,
            data: event,
        };
    }

    @Post()
    @Security('authorized')
    public async postEvent(@Request() request: any, @Body() value: Partial<EventCreateForm>): Promise<GCJSONResponse<Partial<IEvent>>> {
        const category = await Category.findBy({
            id: In(value.categoryIds),
        });

        const event = new Event();
        event.title = value.title;
        event.geoLocation = value.geoLocation;
        event.location = value.location;
        event.description = value.description;
        event.startAt = value.startAt;
        event.category = category;
        event.creator = request.user;
        event.maxParticipants = value.maxParticipants;
        event.imageDescription = value.imageDescription;
        event.groupQr = value.groupQr;
        event.city = value.city;
        event.isPublic = value.isPublic;
        await event.save();

        return {
            success: true,
            data: event,
        };
    }

    @Put()
    @Security('authorized')
    public async putEvent(@Request() request: any, @Body() value: Partial<EventCreateForm>): Promise<GCJSONResponse<Partial<IEvent>>> {
        const user = new User();
        user.id = request.user.id;
        // @ts-ignore
        const event = await Event.findOneBy({ id: value.id, creator: user });
        if (!event) {
            return {
                success: false,
                errorCode: 400,
                errorMessage: '数据不存在',
            };
        }

        const category = await Category.findBy({
            id: In(value.categoryIds),
        });

        event.title = value.title;
        event.geoLocation = value.geoLocation;
        event.location = value.location;
        event.description = value.description;
        event.startAt = value.startAt;
        event.category = category;
        event.creator = request.user;
        event.maxParticipants = value.maxParticipants;
        event.imageDescription = value.imageDescription;
        event.groupQr = value.groupQr;
        event.city = value.city;
        event.isPublic = value.isPublic;
        await event.save();

        return {
            success: true,
            data: event,
        };
    }

    @Post('join/{id}')
    @Security('authorized')
    public async joinEvent(@Request() request: any, @Path() id: string): Promise<GCJSONResponse<IEvent>> {
        const event = await Event.findOne({
            relations: { participants: true, creator: true },
            where: { id, disable: false },
        });

        if (request.user.id == event.creator.id) {
            return {
                success: false,
                errorCode: 200,
                errorMessage: '您就是司机，不用上车！！',
            };
        }

        let participants = event.participants;
        if (!event.participants.find((item) => item.id == request.user.id)) {
            participants.push(request.user);
            event.participants = participants;
            event.joinCount += 1;
            await event.save();
            return {
                success: true,
                data: event,
            };
        } else {
            return {
                success: false,
                errorCode: 200,
                errorMessage: '你已经在车上了！！',
            };
        }
    }

    @Post('quit/{id}')
    @Security('authorized')
    public async quitEvent(@Request() request: any, @Path() id: string): Promise<GCJSONResponse<IEvent>> {
        const event = await Event.findOne({
            relations: { participants: true, creator: true },
            where: { id },
        });

        let participants = event.participants;

        if (event.participants.find((item) => item.id == request.user.id)) {
            participants = participants.filter((item) => item.id != request.user.id);
            event.participants = participants;
            event.joinCount -= 1;
            await event.save();
            return {
                success: true,
                data: event,
            };
        } else {
            return {
                success: false,
                errorCode: 200,
                errorMessage: '你还没上车呢！！',
            };
        }
    }

    /**
     * 指定用户参加过的活动
     * @param request
     * @param userId
     */
    @Get('user/{userId}')
    public async getMyEvents(@Request() request: any, @Path() userId: string): Promise<GCJSONArrayResponse<IEvent>> {
        const take = request.query?.limit || 10;
        const skip = ((request.query?.page || 1) - 1) * take;
        const user = new User();
        user.id = userId;
        let where = {};
        const status = request.query?.status;
        const now = new Date();
        if (status && status != 'all') {
            if (status == 'pending') {
                where['startAt'] = MoreThanOrEqual(now);
            } else {
                where['startAt'] = LessThanOrEqual(now);
            }
        }

        const events = await Event.find({
            relations: {
                participants: true,
            },
            select: ['id', 'title', 'category', 'participants', 'startAt', 'imageDescription', 'joinCount'],
            where: [
                // @ts-ignore
                { participants: user, startAt: where.startAt },
                // @ts-ignore
                { creator: user, startAt: where.startAt },
            ],
            skip,
            take,
        });

        // 活动是否结束，当前时间在开始之间之后就变为已结束
        events.map((event) => {
            // true 是已结束， false 未开始
            event['status'] = dayjs().isAfter(event.startAt);
        });

        return {
            success: true,
            data: events,
        };
    }
}
