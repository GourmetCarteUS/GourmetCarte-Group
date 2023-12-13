import { GCJSONResponse } from 'group-common';
import { Controller, Get, Route, Tags } from 'tsoa';

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
}
