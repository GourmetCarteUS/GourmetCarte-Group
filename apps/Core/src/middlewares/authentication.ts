import express from 'express';
import {verifyJwt} from "../utils/jwt";
import {User} from "../models/User";

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]) {
    const authorized = request.body.token || request.query.token || request.headers['authorization'];

    return new Promise((resolve, reject) => {
        if (!authorized) {
            return reject(new Error('No token provided'));
        }
        let _authorized = authorized;
        if (securityName == 'authorized') {
            _authorized = authorized.split(' ')[1];
        }

        verifyJwt(_authorized, async function (err: any, decoded: any) {
            if (err) {
                reject(err);
            } else {
                const user = await User.findOneBy({id: decoded.id})
                resolve(user);
            }
        });
    });
}
