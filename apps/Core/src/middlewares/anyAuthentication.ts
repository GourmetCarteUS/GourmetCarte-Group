import {verifyJwt} from "../utils/jwt";
import {User} from "../models/User";
import express from "express";

export async function anyAuthentication(request: express.Request, response: express.Response, next: express.NextFunction) {
    const authorized = request.body.token || request.query.token || request.headers['authorization'];
    if (authorized) {
        const jwtStr = authorized.split(' ')[1];
        await verifyJwt(jwtStr, async function (err: any, decoded: any) {
            if (err) {
                return
            } else {
                const user = await User.findOneBy({id: decoded.id})
                if (!user) {
                    request['isLogin'] = false
                } else {
                    request['isLogin'] = true
                    request['user'] = user
                }
            }
        });
    } else {
        request['isLogin'] = false
    }

    next();
}
