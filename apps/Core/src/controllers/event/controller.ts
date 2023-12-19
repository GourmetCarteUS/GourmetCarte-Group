import {GCJSONArrayResponse, GCJSONResponse, IEvent} from 'group-common';
import {Body, Controller, Get, Post, Request, Route, Security, Tags} from 'tsoa';
import {Event} from "../../models/Event";
import {User} from '../../models/User';


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

    @Get("{id}")
    public async getEvent(@Request() request: any, id: string): Promise<GCJSONResponse<IEvent>> {
        const event = await Event.findOne({where: {id}, relations: {category: Boolean(0)}})
        console.log(event)

        return {
            success: true,
            data: event
        }
    }

    @Post()
    @Security('authorized')
    public async postEvent(@Request() request: any, @Body() value: Partial<IEvent>): Promise<GCJSONResponse<Partial<IEvent>>> {
        const event = new Event()
        event.title = value.title
        event.geoLocation = value.geoLocation
        event.location = value.location
        event.description = value.description
        event.startAt = value.startAt
        // event.category.id = value.category.id
        event.creator = request.user
        event.maxParticipants = value.maxParticipants
        event.imageDescription = value.imageDescription
        await event.save()

        return {
            success: true,
            data: event,
        }
    }

    @Post('testEvent')
    public async testEvent(@Request() request: any): Promise<GCJSONResponse<Partial<IEvent>>> {
        const event = new Event()
        event.title = 'test'
        event.geoLocation = 'POINT(0 0)'
        event.location = 'TEST LOCATION'
        event.description = 'TEST'
        event.startAt = new Date()
        // event.category = value.category
        event.creator = await User.findOneById('4b0f45a0-cadf-4c56-917d-0d63075e11dd')
        event.maxParticipants = 10
        await event.save()

        return {
            success: true,
            data: event
        }
    }
}
