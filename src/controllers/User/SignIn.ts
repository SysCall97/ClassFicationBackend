import { INVALID_EMAIL_PASSWORD, SIGNIN_ERROR } from './../../messages/index';
import {Request, Response} from 'express'
import crypto from 'crypto'
import userService from '../../services/User';
import { IAuth } from '../../interfaces';
import Token from '../../services/Token';
import db from '../../database';

class SignIn {
    public static perform(req: Request, res: Response): Promise<any> {
        return new Promise(async () => {
            try {
                await db.connect()
                const data: IAuth[] = await userService.signIn({
                    email: req.body.email,
                    password: crypto.createHash('md5').update(req.body.password).digest('hex')
                });
    
                if(!data.length) {
                    return res.status(404).json({ message: INVALID_EMAIL_PASSWORD });
                }
    
                const token: string = Token.getToken(data[0]);
                
                return res.status(200).json({ token });
            } catch (err: any) {
                return res.status(500).json({ message: err.message || SIGNIN_ERROR });
            } finally {
                await db.disconnect();
            }

        });
    }
}

export default SignIn;

