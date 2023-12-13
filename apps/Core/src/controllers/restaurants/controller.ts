// Example
//
// @Tags('Restaurants')
// @Route('restaurants')
// export class RestaurantsController extends Controller {
//     @Get('')
//     public async list(
//         @Query() page: number = 1,
//         @Query() size: number = 10,
//         /**
//          * Stringified JSON object to represent the query object.
//          */
//         @Query() query: string = '{}',
//         /**
//          * Stringified JSON object to represent the sort object.
//          */
//         @Query() sort: string = '{}'
//     ): Promise<GCJSONArrayResponse<any>> {
//         const rsp = await RestaurantModel.paginate({
//             lean: false,
//             query: { is_active: true, ...JSON.parse(query) },
//             sort: { createdAt: -1, ...JSON.parse(sort) },
//             page,
//             limit: size,
//         });
//         const { docs, ...restOfData } = rsp;
//         return {
//             success: true,
//             data: docs,
//             ...restOfData,
//         };
//     }
//
//     @Get('{id}')
//     public async getRestaurant(@Path() id: string): Promise<GCJSONResponse<any>> {
//         console.log('id', id);
//         const rsp = await RestaurantModel.findOne({ restaurant_id: id });
//         return {
//             success: true,
//             data: rsp,
//         };
//     }
// }
//
