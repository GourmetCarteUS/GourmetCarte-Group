import {Authentication, GCJSONArrayResponse, GCJSONResponse, IUser} from 'group-common';
import {Body, Controller, Get, Post, Route, Security, Tags, Request, Patch} from 'tsoa';
import {User} from '../../models/User';
import {wechat} from "../../wechat";
import {generateJwt} from "../../utils/jwt";
import {AppDataSource} from "../../app-data-source";

@Tags('User')
@Route('user')
export class UserController extends Controller {

    @Get("profile")
    @Security('authorized')
    public async getProfile(@Request() request: any): Promise<GCJSONResponse<Partial<IUser>>> {
        return {
            data: {
                avatarUrl: request.user?.avatarUrl,
                displayName: request.user.displayName,
                id: request.user.id,
            },
            success: true
        }
    }

    /**
     * 微信小程序登录
     * @param data
     */
    @Post("login")
    public async login(@Body() data: { code: string }): Promise<GCJSONResponse<Authentication>> {
        const {openid, session_key} = await wechat['code2Session'](data?.code)
        let user = await User.findOneBy({openId: openid})

        if (!user) {
            user = new User();
            user.openId = openid
            user.displayName = `用户${Math.round(Math.random() * 1000)}`;
            await user.save();
        }

        const token = generateJwt({id: user.id, openId: user.openId})

        return {
            data: {
                token: token
            },
            success: true
        }
    }

    /**
     * 修改用户信息
     * @param request
     * @param data
     */
    @Patch()
    @Security('authorized')
    public async patchMe(@Request() request: any, @Body() data: Partial<IUser>): Promise<GCJSONResponse<Partial<IUser>>> {

        const user = request.user
        if (data.contact) {
            user.contact = data.contact
        }
        if (data.displayName) {
            user.displayName = data.displayName
        }
        if (data.avatarUrl) {
            user.avatarUrl = data.avatarUrl
        }
        user.save()

        return {
            success: true,
            errorMessage: '修改成功',
        }
    }

}