import { DUPLICATE_EMAIL_ERROR, SIGNUP_ERROR, SIGN_UP_SUCCESSFULL } from '../../messages/index';
import {Request, Response} from 'express'
import crypto from 'crypto'
import UserService from '../../services/User';
import { IAuth } from '../../interfaces';
import Token from '../../services/Token';
import { StatusCodes } from 'http-status-codes';

class SignUp {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const data: IAuth = await UserService.signUp({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: crypto.createHash('md5').update(req.body.password).digest('hex')
            });

            const token: string = Token.getToken(data);
            return res.status(StatusCodes.CREATED).json({ 
                message: SIGN_UP_SUCCESSFULL,
                name: data.name,
                uid: data._id,
                email: data.email,
                role: data.role,
                token
            });
        } catch (err: any) {
            if(err.code === 11000) {
                return res.status(StatusCodes.CONFLICT).json({ message: DUPLICATE_EMAIL_ERROR });
            }
            else {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: SIGNUP_ERROR });
            }
        }
    }
}

export default SignUp;