import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';

export interface GoogleNormalizedPlace {
    description: string;
    place_id?: string;
}
const client = new Client({});
const autoComplete = async (input: string, location?: [number, number]): Promise<GoogleNormalizedPlace[]> => {
    const response = await client.placeQueryAutocomplete({
        params: {
            input,
            ...(location && {
                location: location,
            }),
            key: process.env.GOOGLE_MAPS_API_KEY,
            radius: 10000,
        },
    });

    return response.data.predictions.map((p) => ({ description: p.description, place_id: p.place_id }));
};

/**
 * place_id 和 addr description只能二选一传入
 * @param place
 */
const geoCode = async (place: GoogleNormalizedPlace): Promise<LatLngLiteral> => {
    const rsp = await client.geocode({
        params: {
            place_id: place.place_id,
            address: place.description,
            key: process.env.GOOGLE_MAPS_API_KEY,
        },
    });

    return rsp.data.results[0].geometry.location;
};

export const GoogleMapUtils = {
    autoComplete,
    geoCode,
};
