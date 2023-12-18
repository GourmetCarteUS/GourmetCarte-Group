import jwt from 'jsonwebtoken';
import {User} from '../models/User';

/**
 * 生成JWT
 * @param userInfo
 */
export function generateJwt(userInfo: Partial<User>) {
    return jwt.sign(userInfo, process.env.SECRET_KEY, {expiresIn: '7d'})
}


/**
 * 解析JWT
 */
export function verifyJwt(res: string, back: Function) {
    return jwt.verify(res, process.env.SECRET_KEY, (err: any, decoded: any) => back(err, decoded));
}



