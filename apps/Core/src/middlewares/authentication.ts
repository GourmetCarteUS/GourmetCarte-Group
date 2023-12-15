import express from 'express';
import jwt from 'jsonwebtoken';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]) {
    const authorized = request.body.token || request.query.token || request.headers['authorization'];

    return new Promise((resolve, reject) => {
        if (!authorized) {
            reject(new Error('No token provided'));
        }
        let _authorized = authorized;
        if (securityName == 'authorized') {
            _authorized = authorized.split(' ')[1];
        }

        jwt.verify(_authorized, process.env.SECRET_KEY, function (err: any, decoded: any) {
            if (err) {
                reject(err);
            } else {
                // if (!(scopes.includes('admin') && decoded.is_admin)) {
                //     reject(new Error("JWT does not contain required scope."));
                // }
                resolve({ user_id: decoded.user_id, is_admin: decoded.is_admin });
            }
        });
    });
}
