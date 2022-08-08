import UserService from '../services/User';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { JOIN_THE_CLASS } from './../messages/index';

export async function checkJoinedClassMiddleware(req: Request, res: Response, next: NextFunction) {
    const classCode = req.params.class_code;
    const uid = req.body.uid;
    const role = req.body.role;
    const isJoinedClass = await UserService.isJoinedClass({uid, classCode, role});
    if(!!isJoinedClass) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: JOIN_THE_CLASS });
}