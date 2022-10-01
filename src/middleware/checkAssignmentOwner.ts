import { ICheckEntityOwner } from './../interfaces/IClass';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { NOT_ALLOWED_ACTION } from "../messages";
import AssignmentService from '../services/Assignment';

export async function checkAssignmentOwner(req: Request, res: Response, next: NextFunction) {
    const assignmentId: string = req.params.assignment_id;
    const uid = req.body.uid;

    const payload: ICheckEntityOwner = {
        entityId: assignmentId,
        uid
    }
    const isPostOwner = await AssignmentService.isAssignmentOwner(payload);
    if(!!isPostOwner) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: NOT_ALLOWED_ACTION });
}