import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { STUDENT_FORBIDDEN_ACTION } from './../messages/index';
import { roles } from '../helpers';

export async function filterOutStudent(req: Request, res: Response, next: NextFunction) {
    const role = req.body.role;
    if(role !== roles.student) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: STUDENT_FORBIDDEN_ACTION });
}