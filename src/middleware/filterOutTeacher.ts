import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { TEACHER_FORBIDDEN_ACTION } from './../messages/index';
import { roles } from '../helpers';

export async function filterOutTeacher(req: Request, res: Response, next: NextFunction) {
    const role = req.body.role;
    if(role !== roles.teacher) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: TEACHER_FORBIDDEN_ACTION });
}