import {GCJSONArrayResponse, GCJSONResponse, ICategory} from 'group-common';
import {Body, Controller, Get, Post, Route, Tags} from 'tsoa';
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

    @Post()
    public async postCategory(@Body() value: {
        name: string,
        sort: number
    }): Promise<GCJSONResponse<Partial<ICategory>>> {
        const category = new Category();
        category.name = value.name
        category.sort = value.sort
        await category.save()
        return {
            success: true,
            data: category
        }
    }
}
