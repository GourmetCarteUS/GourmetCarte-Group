import {GCJSONArrayResponse} from 'group-common';
import {Controller, Get, Route, Tags} from 'tsoa';

interface CategoryModel {
  id: number;
  name: string
}

@Tags('Category')
@Route('category')
export class CategoryController extends Controller {
  @Get()
  public getCategories(): GCJSONArrayResponse<CategoryModel> {
    return {
      success: true,
      data: [
        {id: 1, name: "户外活动"},
        {id: 2, name: "室内活动"},
        {id: 3, name: "饭局"},
      ]
    };
  }
}
