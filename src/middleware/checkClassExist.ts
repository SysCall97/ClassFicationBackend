import ClassService from '../services/_Class';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { CLASS_NOT_FOUND } from './../messages/index';

export async function checkClassExistsMiddleware(req: Request, res: Response, next: NextFunction) {
    const classCode = req.params.class_code;
    const isClassExists = await ClassService.isClassExist(classCode);
    if(!!isClassExists) next();
    else return res.status(StatusCodes.NOT_FOUND).json({ message: CLASS_NOT_FOUND });
}