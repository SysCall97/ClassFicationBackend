import { IAuth } from './../../interfaces/ISignup';
import * as jwt from 'jsonwebtoken';

class Token {
    public static getToken(data: IAuth): string {
        const privateKey: string = process.env.JWT_SECRET!;
        const expireMinute: string = process.env.JWT_EXPIRE_MINUTE!;
        const info = {
            uid: data._id,
            signedIn: new Date().toLocaleString()
        }
        const token: string = jwt.sign(info, privateKey, { expiresIn: Number(expireMinute) * 60 });

        return token;
    }
}

export default Token;