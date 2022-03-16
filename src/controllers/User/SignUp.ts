import {Request, Response} from 'express'
import crypto from 'crypto'
import * as jwt from 'jsonwebtoken';
import userService from '../../services/User';

class SignUp {
    public static async perform(req: Request, res: Response): Promise<any> {
        try {
            // return res.send(req.body);
            const privateKey: string = process.env.JWT_SECRET!;
            const expireMinute: string = process.env.JWT_EXPIRE_MINUTE!;

            const data = await userService.signUp({
                name: req.body.name,
                email: req.body.email,
                password: crypto.createHash('md5').update(req.body.password).digest('hex')
            });
            const info = {
                uid: data._id,
                signedIn: new Date().toLocaleString()
            }
            const token = jwt.sign(info, privateKey, { expiresIn: Number(expireMinute) * 60 });
    
            return res.status(200).json({ token });
        } catch (err: any) {
            return res.status(500).json({ message: err.message || "Error occured while signup" });
        }
    }
}

export default SignUp;