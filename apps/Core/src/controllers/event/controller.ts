import {GCJSONArrayResponse, GCJSONResponse, IEvent} from 'group-common';
import {Body, Controller, Get, Post, Request, Route, Security, Tags} from 'tsoa';
import {Event} from "../../models/Event";
import {Category} from "../../models/Category";


@Tags('Event')
@Route('event')
export class EventController extends Controller {
    @Get()
    public async getEvents(@Request() request: { category?: string }): Promise<GCJSONArrayResponse<IEvent>> {
        const events = await Event.find()
        console.log(events)

        return {
            success: true,
            data: events
        }
    }

    @Get(":id")
    public async getEvent(@Request() request: any, id: string): Promise<GCJSONResponse<IEvent>> {
        const event = await Event.findOne({where: {id}, relations: {category: true, creator: true}})

        if (request?.isLogin) {
            event['isMe'] = request.user.id == event.creator.id
        }

        return {
            success: true,
            data: event
        }
    }

    @Post()
    @Security('authorized')
    public async postEvent(@Request() request: any, @Body() value: Partial<IEvent>): Promise<GCJSONResponse<Partial<IEvent>>> {
        // const category = await Category.findOneBy({id: value.category + ""})

        const event = new Event()
        event.title = value.title
        event.geoLocation = value.geoLocation
        event.location = value.location
        event.description = value.description
        event.startAt = value.startAt
        // event.category = category
        event.creator = request.user
        event.maxParticipants = value.maxParticipants
        event.imageDescription = value.imageDescription
        await event.save()

        return {
            success: true,
            data: event,
        }
    }
}
