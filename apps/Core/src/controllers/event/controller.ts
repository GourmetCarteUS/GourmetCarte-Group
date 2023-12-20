import {EventCreateForm, GCJSONArrayResponse, GCJSONResponse, IEvent} from 'group-common';
import {Body, Controller, Get, Path, Post, Request, Route, Security, Tags} from 'tsoa';
import {Event} from "../../models/Event";
import {Category} from "../../models/Category";
import {In} from "typeorm";


@Tags('Event')
@Route('event')
export class EventController extends Controller {
    @Get()
    public async getEvents(@Request() request: any): Promise<GCJSONArrayResponse<IEvent>> {

        let order = {}
        let where = {
            disable: false,
        }
        if (request.query?.category) {
            if (request.query?.category == 'all') {
            } else if (request.query?.category == 'hot') {
                order = {viewCount: "DESC"}
            } else {
                const category = new Category()
                category.id = request.query?.category
                where['category'] = category
            }
        }

        const events = await Event.find({
            where,
            relations: {
                participants: true
            },
            order,
            skip: Number((request.query?.page - 1) * (request.query?.limit || 10)),
            take: Number(request.query?.limit || 10)
        })

        return {
            success: true,
            data: events
        }
    }

    @Get(":id")
    public async getEvent(@Request() request: any, id: string): Promise<GCJSONResponse<IEvent>> {
        const event = await Event.findOne(
          {
              where: {id},
              relations: {
                  category: true,
                  creator: true,
                  participants: true
              }
          })

        if (request?.isLogin) {
            const isMe = request.user.id == event.creator.id
            event['isMe'] = isMe
            if (!isMe) {
                event.viewCount += 1
                await event.save()
            } else if (event.participants.find(id => request.user.id)) {
                event['isJoin'] = true
            }

        }

        return {
            success: true,
            data: event
        }
    }

    @Post()
    @Security('authorized')
    public async postEvent(@Request() request: any, @Body() value: Partial<EventCreateForm>): Promise<GCJSONResponse<Partial<IEvent>>> {
        const category = await Category.findBy({
            id: In(value.categoryIds)
        })

        const event = new Event()
        event.title = value.title
        event.geoLocation = value.geoLocation
        event.location = value.location
        event.description = value.description
        event.startAt = value.startAt
        event.category = category
        event.creator = request.user
        event.maxParticipants = value.maxParticipants
        event.imageDescription = value.imageDescription
        event.groupQr = value.groupQr
        await event.save()

        return {
            success: true,
            data: event,
        }
    }


    @Post("join/{id}")
    @Security('authorized')
    public async joinEvent(@Request() request: any, @Path() id: string): Promise<GCJSONResponse<IEvent>> {

        const event = await Event.findOne({
            relations: {participants: true, creator: true},
            where: {id}
        })

        if (request.user.id == event.creator.id) {
            return {
                success: false,
                errorCode: 200,
                errorMessage: '您就是司机，不用上车！！'
            }
        }

        let participants = event.participants
        if (!event.participants.find(item => item.id == request.user.id)) {
            participants.push(request.user)
            event.participants = participants
            await event.save()
            return {
                success: true,
                data: event
            }
        } else {
            return {
                success: false,
                errorCode: 200,
                errorMessage: '你已经在车上了！！'
            }
        }

    }

    @Post("quit/{id}")
    @Security('authorized')
    public async quitEvent(@Request() request: any, @Path() id: string): Promise<GCJSONResponse<IEvent>> {

        const event = await Event.findOne({
            relations: {participants: true, creator: true},
            where: {id}
        })

        if (request.user.id == event.creator.id) {
            return {
                success: false,
                errorCode: 200,
                errorMessage: '您就是司机，不能下车！！'
            }
        }

        let participants = event.participants

        if (event.participants.find(item => item.id == request.user.id)) {
            participants = participants.filter(item => item.id != request.user.id)
            event.participants = participants
            await event.save()
            return {
                success: true,
                data: event
            }
        } else {
            return {
                success: false,
                errorCode: 200,
                errorMessage: '你还没上车呢！！'
            }
        }

    }
}
