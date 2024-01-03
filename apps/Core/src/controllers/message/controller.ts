import { GCJSONResponse } from 'group-common';
import { Controller, Post, Route, Tags } from 'tsoa';
import { sendMessage } from './message';

@Tags('Message')
@Route('message')
export class MessageController extends Controller {
    @Post('test')
    public testPostMessage(): GCJSONResponse<string> {
        let messages = {
            touser: 'oTCyl65Vy2mDNeRaJYlkcj4ah7k0',
            startAt: '2024-1-10 19:00',
            title: '测试活动',
            eventId: '4ff06c54-a9c5-4e9f-992a-02bae5c78fb1',
        };
        sendMessage(1, messages);

        return {
            success: true,
            data: '1.0',
        };
    }
}
