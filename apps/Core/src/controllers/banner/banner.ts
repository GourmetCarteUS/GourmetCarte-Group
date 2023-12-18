import {GCJSONArrayResponse, IBanner} from 'group-common';
import {Controller, Get, Route, Tags} from 'tsoa';
import {Banner} from "../../models/Banner";

@Tags('Banner')
@Route('banner')
export class BannerController extends Controller {
    @Get()
    public async getBanners(): Promise<GCJSONArrayResponse<IBanner>> {
        const banners = await Banner.find({order: {sort: "desc"}})

        return {
            success: true,
            data: banners
        }
    }
}
