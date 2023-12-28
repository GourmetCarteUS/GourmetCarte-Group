import { GCJSONResponse } from 'group-common';
import { Controller, Post, Route, Tags, UploadedFile } from 'tsoa';
import { S3Utils } from '../../utils/s3';

@Tags('Upload')
@Route('upload')
export class UploadController extends Controller {
    @Post('image')
    public async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<GCJSONResponse<string>> {
        const url = await S3Utils.uploadObject('images/' + this.generateFilename(file), file.buffer);

        return {
            success: !!url,
            data: url,
        };
    }

    private generateFilename(file: Express.Multer.File) {
        const fileExtension = file.originalname.split('.').pop();
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        return `${file.originalname}-${uniqueSuffix}.${fileExtension}`;
    }
}
