import { GCJSONResponse } from 'group-common';
import { Controller, Get, Route, Tags } from 'tsoa';
import { User } from '../../models/User';

@Tags('Version')
@Route('version')
export class VersionController extends Controller {
    @Get('')
    public getVersion(): GCJSONResponse<string> {
        return {
            success: true,
            data: '1.0',
        };
    }

    @Get('testdb')
    public async testDB(): Promise<GCJSONResponse<string>> {

        // User.update()
        const user = new User();

        user.avatarUrl = 'https://avatars.githubusercontent.com/u/1024025?v=4';
        user.displayName = 'test';
        user.openId = 'test';
        user.unionId = 'test';
        await user.save();

        return {
            success: true,
            data: '1.0',
        };
    }
}
