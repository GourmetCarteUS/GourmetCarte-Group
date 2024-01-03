import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { GCJSONArrayResponse, GCJSONResponse } from 'group-common';
import { Controller, Get, Query, Route, Tags } from 'tsoa';
import { GoogleMapUtils, GoogleNormalizedPlace } from '../../utils/GoogleMap';

@Tags('Locations')
@Route('location')
export class LocationController extends Controller {
    @Get('autocomplete')
    public async autocomplete(@Query() input: string, @Query() location?: string): Promise<GCJSONArrayResponse<GoogleNormalizedPlace>> {
        const data = await GoogleMapUtils.autoComplete(input, location?.split(',') as unknown as [number, number] | undefined);

        return {
            success: true,
            data,
        };
    }

    /**
     * placeId 和 placeId description只能二选一传入
     * @param address
     * @param placeId
     */
    @Get('geocode')
    public async geoCode(@Query() address?: string, @Query() placeId?: string): Promise<GCJSONResponse<LatLngLiteral>> {
        const data = await GoogleMapUtils.geoCode({
            ...(address && { description: address }),
            ...(placeId && { place_id: placeId }),
        });

        return {
            success: true,
            data,
        };
    }
}
