import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { ALREADY_SUBMITTED } from './../messages/index';
import AssignmentService from '../services/Assignment';
import SubmissionService from "../services/Submission";

export async function checkAlreadySubmited(req: Request, res: Response, next: NextFunction) {
    const assignmentId: string = req.params.assignment_id;
    const classCode = req.params.class_code;
    const uid: string = req.body.uid;
    const { assignmentCode, startDate } = await AssignmentService.getAssignmentCodeById(assignmentId, classCode);

    const isSubmissionExists = await SubmissionService.isAlreadySubmitted(uid, assignmentCode);
    if(!!isSubmissionExists) return res.status(StatusCodes.FORBIDDEN).json({ message: ALREADY_SUBMITTED });
    else next();
}