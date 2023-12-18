import {GCJSONArrayResponse, ICategory} from 'group-common';
import {Controller, Get, Route, Tags} from 'tsoa';
import {Category} from "../../models/Category";


@Tags('Category')
@Route('category')
export class CategoryController extends Controller {
    @Get()
    public async getCategories(): Promise<GCJSONArrayResponse<Partial<ICategory>>> {
        const categories = await Category.find({order: {sort: "desc"}})
        return {
            success: true,
            data: categories
        }
    }
}
