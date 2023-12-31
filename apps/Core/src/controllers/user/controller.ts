import { Authentication, GCJSONResponse, IUser } from 'group-common';
import { Body, Controller, Get, Patch, Post, Request, Route, Security, Tags } from 'tsoa';
import { User } from '../../models/User';
import { Event } from '../../models/Event';
import { wechat } from '../../wechat';
import { generateJwt } from '../../utils/jwt';

@Tags('User')
@Route('user')
export class UserController extends Controller {
    @Get('profile')
    @Security('authorized')
    public async getProfile(@Request() request: any) {
        const user = new User();
        user.id = request.user.id;

        const joinCount = await Event.findAndCount({
            where: {
                // @ts-ignore
                participants: user,
            },
        });

        const createCount = await Event.findAndCount({
            where: {
                // @ts-ignore
                creator: user,
            },
        });

        return {
            data: {
                avatarUrl: request.user?.avatarUrl,
                displayName: request.user?.displayName,
                contact: request.user.contact,
                id: request.user.id,
                joinCount: joinCount[1],
                createCount: createCount[1],
            },
            success: true,
        };
    }

    /**
     * 微信小程序登录
     * @param data
     */
    @Post('login')
    public async login(@Body() data: { code: string }): Promise<GCJSONResponse<Authentication>> {
        const { openid, session_key } = await wechat['code2Session'](data?.code);
        let user = await User.findOneBy({ openId: openid });

        if (!user) {
            user = new User();
            user.openId = openid;
            user.displayName = `用户${Math.round(Math.random() * 1000)}`;
            await user.save();
        }

        const token = generateJwt({ id: user.id, openId: user.openId });

        return {
            data: {
                token: token,
            },
            success: true,
        };
    }

    /**
     * 修改用户信息
     * @param request
     * @param data
     */
    @Patch()
    @Security('authorized')
    public async patchMe(@Request() request: any, @Body() data: Partial<IUser>): Promise<GCJSONResponse<Partial<IUser>>> {
        const user = request.user;
        if (data.contact) {
            user.contact = data.contact;
        }
        if (data.displayName) {
            user.displayName = data.displayName;
        }
        if (data.avatarUrl) {
            user.avatarUrl = data.avatarUrl;
        }
        user.save();

        return {
            success: true,
            data: user,
            errorMessage: '修改成功',
        };
    }
}
