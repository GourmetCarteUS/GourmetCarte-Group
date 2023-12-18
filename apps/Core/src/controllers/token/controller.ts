import {GCJSONResponse} from 'group-common';
import {decode} from 'js-base64';
import {
    Body,
    Controller,
    Get,
    Header,
    Hidden,
    Post,
    Request,
    Res,
    Route,
    Security,
    TsoaResponse,
} from 'tsoa';

type TokenFormData = {
    username?: string;
    password?: string;
    grant_type?: string;
    client_id?: string;
    client_secret?: string;
};

@Route('token')
export class TokenController extends Controller {
    @Post('')
    @Hidden()
    public async post(
      @Body() formData: TokenFormData,
      @Header() authorization: string,
      @Res() notFoundResponse: TsoaResponse<401, GCJSONResponse<string>>
    ) {
        let access_token = '', token_type = 'Bearer';
        if (formData?.username && formData?.password) {
            try {
                console.log("123214")
                // const {data} = await AuthService.signIn(formData?.username, formData?.password);
                // access_token = data.access_token;
                // token_type = data.token_type;
            } catch (e) {
                return notFoundResponse(e.response.status, e.response.data);
            }
        } else if (authorization) {
            access_token = decode(authorization.split(' ')[1]).split(':')[1];
        } else if (formData.client_id && formData.client_secret) {
            token_type = formData.client_id;
            access_token = formData.client_secret;
        }
        return {access_token, token_type};
    }

    @Get('')
    @Security('authorized')
    public get(@Request() request: any): GCJSONResponse<string> {
        return {
            success: true,
            data: request.user,
        };
    }
}
