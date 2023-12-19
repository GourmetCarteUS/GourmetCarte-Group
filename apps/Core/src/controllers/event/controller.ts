import {EventCreateForm, EventForm, GCJSONArrayResponse, GCJSONResponse, IEvent} from 'group-common';
import {Body, Controller, Get, Post, Query, Request, Route, Security, Tags} from 'tsoa';
import {Event} from "../../models/Event";
import {Category} from "../../models/Category";
import {getManager, getRepository, In, Raw} from "typeorm";
import {User} from "../../models/User";
import {deflateRawSync} from "zlib";
import {query} from "express";


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
}
