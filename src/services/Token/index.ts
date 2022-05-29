import { IAuth } from '../../interfaces/IAuth';
import * as jwt from 'jsonwebtoken';
import Dump from '../../models/Token'

class Token {
    public static getToken(data: IAuth): string {
        console.log(data);
        const privateKey: string = process.env.JWT_SECRET!;
        const expireMinute: string = process.env.JWT_EXPIRE_MINUTE!;
        const info = {
            uid: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            signedIn: new Date().toLocaleString()
        }
        const token: string = jwt.sign(info, privateKey, { expiresIn: Number(expireMinute) * 60 });

        return token;
    }

    public static isDumped (token: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try {
                const val = await Dump.findOne({ token });
                resolve(val);
            } catch (error) {
                reject("Not found")
            }
        });
    }
}

export default Token;