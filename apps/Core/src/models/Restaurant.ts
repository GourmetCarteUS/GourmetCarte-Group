/*** Example file

import {
    AddressModel,
    BusinessHour,
    Restaurant,
    SupportedDelivery,
    SupportedReservation,
} from 'gc-common';
import { model, Schema } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { S3Util } from '../utils/s3util';

// export interface RestaurantDocument extends Restaurant, Document<string> {}
const AddressModelSchema = new Schema<AddressModel>({
    address: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    zip_code: String,
    location: [Number],
});
const BusinessHourSchema = new Schema<BusinessHour>({
    Monday: String,
    Tuesday: String,
    Wednesday: String,
    Thursday: String,
    Friday: String,
    Saturday: String,
    Sunday: String,
});
const SupportedDeliverySchema = new Schema<SupportedDelivery>({
    ubereats: Object,
    grubhub: Object,
    doordash: Object,
    postmates: Object,
});
const SupportedReservationSchema = new Schema<SupportedReservation>({
    opentable: Object,
    tock: Object,
});
const schema = new Schema<Restaurant>(
    {
        version: Number,
        last_updated: Number,
        time_created: Number,
        currency: String,
        name: String,
        address: AddressModelSchema,
        business_hour: BusinessHourSchema,
        is_active: Boolean,
        info: String,
        image_ids: [String],
        price_range: Number,
        rating: Number,
        menu_ids: [String],
        phone: String,
        website: String,
        owner_ids: [String],
        tags: [String],
        supported_delivery: SupportedDeliverySchema,
        supported_reservation: SupportedReservationSchema,
        restaurant_id: String,
        // image_urls: [String],
        // avatar_image_url: { type: String, get: S3Util.getPictureUrl },
        avatar_image_id: String,
        dish_count: Number,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

schema.plugin(mongoosePagination);
schema.virtual('avatar_image_url').get(function () {
    return S3Util.getPictureUrl(this.avatar_image_id);
});
schema.virtual('image_urls').get(function () {
    return S3Util.getPictureUrls(this.image_ids);
});

export const RestaurantModel = model<Restaurant, Pagination<Restaurant>>(
    'Restaurant',
    schema,
    'restaurant_dish_count'
    // 'restaurant',
);


 */