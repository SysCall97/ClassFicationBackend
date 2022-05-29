import { StatusCodes } from 'http-status-codes';
import { SIGN_UP_OBJECT_ERROR } from './../messages/index';
import { IAuthValidation, ISignin } from './../interfaces/IAuth';
import { NextFunction, Request, Response } from "express";
import { signInObjectValidation } from "../helpers";

export function signInMiddleware(req: Request, res: Response, next: NextFunction) {
    const obj: ISignin = {
        email: req.body.email || '',
        password: req.body.password || ''
    };

    const data: IAuthValidation = signInObjectValidation(obj);

    if(data.status) next();
    else return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: data.message || SIGN_UP_OBJECT_ERROR });
}