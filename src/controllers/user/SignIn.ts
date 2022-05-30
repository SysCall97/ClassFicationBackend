import { INVALID_EMAIL_PASSWORD, SIGNIN_ERROR, SIGN_IN_SUCCESSFULL } from '../../messages/index';
import {Request, Response} from 'express'
import crypto from 'crypto'
import UserService from '../../services/User';
import { IAuth } from '../../interfaces';
import Token from '../../services/Token';
import { StatusCodes } from 'http-status-codes';

class SignIn {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const data: IAuth[] = await UserService.signIn({
                email: req.body.email,
                password: crypto.createHash('md5').update(req.body.password).digest('hex')
            });

            if(!data.length) {
                return res.status(StatusCodes.UNAUTHORIZED).json({ message: INVALID_EMAIL_PASSWORD });
            }

            const token: string = Token.getToken(data[0]);
            
            return res.status(StatusCodes.OK).json({ 
                message: SIGN_IN_SUCCESSFULL, 
                name: data[0].name,
                uid: data[0]._id,
                email: data[0].email,
                role: data[0].role,
                token 
            });
        } catch (err: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || SIGNIN_ERROR });
        }
    }
}

export default SignIn;

