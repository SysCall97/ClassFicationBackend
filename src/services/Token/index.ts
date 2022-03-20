import { IAuth } from '../../interfaces/IAuth';
import * as jwt from 'jsonwebtoken';
import Dump from '../../models/Token'

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

    
    
    public static isDumped (token: any): Promise<any> {
        return new Promise(() => Dump.find({ token: token }));
    }
}

export default Token;