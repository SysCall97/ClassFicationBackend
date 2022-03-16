import {Request, Response} from 'express'
import crypto from 'crypto'
import * as jwt from 'jsonwebtoken';
import userService from '../../services/User';
import { env } from 'process';
// const userService = require("../services/userService");

class SignIn {
    // #privateKey = env.JWT_SECRET;
    // #expireMinute = env.JWT_EXPIRE_MINUTE;

    // public static async perform(req: Request, res: Response) {
    //     try {
    //         const data = await userService.signIn({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: crypto.createHash('md5').update(req.body.password).digest('hex')
    //         });
    //         const info = {
    //             uid: data._id,
    //             signedIn: new Date().toLocaleString()
    //         }
    //         const token = jwt.sign(info, this.#privateKey, { expiresIn: this.#expireMinute * 60 });
    
    //         return res.status(200).json({ token });
    //     } catch (err: any) {
    //         return res.status(500).json({ message: err.message });
    //     }
    // }
}

export default SignIn;

