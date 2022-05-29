import { StatusCodes } from 'http-status-codes';
import { SIGN_OUT_SUCCESSFULL, SIGN_OUT_FAILURE } from '../../messages/index';
import {Request, Response} from 'express'
import UserService from '../../services/User';

class SignOut {
    public static perform(req: Request, res: Response): any {
        return new Promise(async () => {
            try {
                const token: string = req.headers.authorization?.split(' ')[1]!;
                await UserService.signOut({token});
                return res.status(StatusCodes.OK).json({ message: SIGN_OUT_SUCCESSFULL });
            } catch (err: any) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err?.message || SIGN_OUT_FAILURE });
            }
        });
    }
}

export default SignOut;