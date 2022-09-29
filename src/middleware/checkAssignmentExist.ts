import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { ASSIGNMENT_NOT_FOUND } from './../messages/index';
import AssignmentService from '../services/Assignment';

export async function checkAssignmentExistMiddleware(req: Request, res: Response, next: NextFunction) {
    const classCode = req.params.class_code;
    const assignmentId: string = req.params.assignment_id;

    const isAssignmentExists = await AssignmentService.isAssignmentExists({ classCode, assignmentId })
    if(!!isAssignmentExists) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: ASSIGNMENT_NOT_FOUND });
}