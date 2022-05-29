import { SIGN_UP_OBJECT_ERROR } from './../messages/index';
import { ISignup, IAuthValidation } from './../interfaces/IAuth';
import { NextFunction, Request, Response } from "express";
import { signUpObjectValidation } from "../helpers";

export function signUpMiddleware(req: Request, res: Response, next: NextFunction) {
    const obj: ISignup = {
        name: req.body.name || '',
        email: req.body.email || '',
        role: req.body.role || -1,
        password: req.body.password || ''
    };

    const data: IAuthValidation = signUpObjectValidation(obj);

    if(data.status) next();
    else return res.status(400).json({ message: data.message || SIGN_UP_OBJECT_ERROR });
}