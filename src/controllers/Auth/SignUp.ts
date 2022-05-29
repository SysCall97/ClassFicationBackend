import { SIGNUP_ERROR, SIGN_UP_SUCCESSFULL } from '../../messages/index';
import {Request, Response} from 'express'
import crypto from 'crypto'
import userService from '../../services/User';
import { IAuth } from '../../interfaces';
import Token from '../../services/Token';

class SignUp {
    public static perform(req: Request, res: Response): Promise<any> {
        return new Promise(async () => {
            try {
                const data: IAuth = await userService.signUp({
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    password: crypto.createHash('md5').update(req.body.password).digest('hex')
                });
    
                const token: string = Token.getToken(data);
                return res.status(200).json({ 
                    message: SIGN_UP_SUCCESSFULL,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    token
                 });
            } catch (err: any) {
                return res.status(500).json({ message: err.message || SIGNUP_ERROR });
            }
        });
    }
}

export default SignUp;