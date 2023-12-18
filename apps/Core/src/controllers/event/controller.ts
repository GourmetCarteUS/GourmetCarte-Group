import {GCJSONArrayResponse, GCJSONResponse, IEvent} from 'group-common';
import {Body, Controller, Get, Post, Request, Route, Security, Tags} from 'tsoa';
import {Event} from "../../models/Event";


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

    @Post()
    @Security('authorized')
    public async postEvent(@Request() request: any, @Body() value: Partial<IEvent>): Promise<GCJSONResponse<Partial<IEvent>>> {
        const event = new Event()
        event.title = value.title
        event.geoLocation = value.geoLocation
        event.location = value.location
        event.description = value.description
        event.startAt = value.startAt
        event.category = value.category
        event.creator = request.user
        event.maxParticipants = value.maxParticipants
        event.imageDescription = value.imageDescription
        await event.save()

        return {
            success: true,
            data: {}
        }
    }
}
