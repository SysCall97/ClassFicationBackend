import { INVALID_EMAIL_PASSWORD, SIGNIN_ERROR, SIGN_IN_SUCCESSFULL } from '../../messages/index';
import {Request, Response} from 'express'
import crypto from 'crypto'
import userService from '../../services/User';
import { IAuth } from '../../interfaces';
import Token from '../../services/Token';
import { StatusCodes } from 'http-status-codes';

class SignIn {
    public static async perform(req: Request, res: Response): Promise<void> {
        try {
            const data: IAuth[] = await userService.signIn({
                email: req.body.email,
                password: crypto.createHash('md5').update(req.body.password).digest('hex')
            });

            if(!data.length) {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: INVALID_EMAIL_PASSWORD });
            }

            const token: string = Token.getToken(data[0]);
            
            res.status(StatusCodes.OK).json({ 
                message: SIGN_IN_SUCCESSFULL, 
                name: data[0].name,
                email: data[0].email,
                role: data[0].role,
                token 
            });
        } catch (err: any) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || SIGNIN_ERROR });
        }
    }
}

export default SignIn;

