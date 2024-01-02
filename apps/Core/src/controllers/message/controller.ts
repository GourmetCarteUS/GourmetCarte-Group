import { GCJSONResponse } from 'group-common';
import { Controller, Post, Route, Tags } from 'tsoa';
import { wechat } from '../../wechat';

@Tags('Message')
@Route('message')
export class MessageController extends Controller {
    @Post()
    public postMessage(): GCJSONResponse<string> {
        // 示例代码，对应上方红线的内容
        let messages = {
            touser: 'c50836fe-7064-4c54-89c3-76b937a78fed', //给某用户推送的openid，这个得你获取到用户的openid，才可以进行推送
            template_id: 'whvZi7swOrbC1TqXmz4Yr3zh9JhmbH-ruDkc3CAlrU0', //订阅模板id
            data: {
                thing1: {
                    value: '活动名称1111',
                },
                time2: {
                    value: '2023-12-29',
                },
                thing4: {
                    value: '活动结束还有30天',
                },
                thing5: {
                    value: '备注备注',
                },
            },
        };

        const re = wechat['sendCustomMessage'](messages);
        console.log(re);

        return {
            success: true,
            data: '1.0',
        };
    }
}
