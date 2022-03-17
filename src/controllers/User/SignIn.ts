import {Request, Response} from 'express'
import crypto from 'crypto'
import userService from '../../services/User';
import { IAuth } from '../../interfaces';
import Token from '../../services/Token';
// const userService = require("../services/userService");

class SignIn {
    public static async perform(req: Request, res: Response): Promise<any> {
        try {
            const data: IAuth = await userService.signIn({
                email: req.body.email,
                password: crypto.createHash('md5').update(req.body.password).digest('hex')
            });

            const token: string = Token.getToken(data);
            
            return res.status(200).json({ token });
        } catch (err: any) {
            return res.status(500).json({ message: err.message || "Error occured while signup" });
        }
    }
}

export default SignIn;

