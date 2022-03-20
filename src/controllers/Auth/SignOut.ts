import { SIGN_OUT_SUCCESSFULL, SIGN_OUT_FAILURE } from '../../messages/index';
import {Request, Response} from 'express'
import UserService from '../../services/User';

class SignOut {
    public static perform(req: Request, res: Response): any {
        return new Promise(async () => {
            try {
                const token: string = req.headers.authorization?.split(' ')[1]!;
                await UserService.signOut({token});
                return res.status(200).json({ message: SIGN_OUT_SUCCESSFULL });
            } catch (err: any) {
                return res.status(500).json({ message: err?.message || SIGN_OUT_FAILURE });
            }
        });
    }
}

export default SignOut;