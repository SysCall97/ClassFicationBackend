import {Request, Response} from 'express'
import crypto from 'crypto'
import * as jwt from 'jsonwebtoken';
// const userService = require("../services/userService");

class SignOut {
    public static perform(req: Request, res: Response): any {
        // try {
        //     const data = await userService.signIn({
        //         name: req.body.name,
        //         email: req.body.email,
        //         password: crypto.createHash('md5').update(req.body.password).digest('hex')
        //     });
        //     const info = {
        //         uid: data._id,
        //         signedIn: new Date().toLocaleString()
        //     }
        //     const token = await jwt.sign(info, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_MINUTE * 60 });
    
        //     return res.status(200).json({ token });
        // } catch (err) {
        //     return res.status(500).json({ message: err.message });
        // }
    }
}

export default SignOut;