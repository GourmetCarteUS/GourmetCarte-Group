import {GCJSONArrayResponse, GCJSONResponse, IBanner} from 'group-common';
import {Body, Controller, Get, Post, Route, Tags} from 'tsoa';
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

    @Post()
    public async postBanner(@Body() value: Partial<IBanner>): Promise<GCJSONResponse<IBanner>> {
        const banner = new Banner()
        Object.assign(banner, value)
        await banner.save()

        return {
            success: true,
            data: banner
        }
    }
}
