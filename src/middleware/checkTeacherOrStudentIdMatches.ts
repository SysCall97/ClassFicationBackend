import { roles } from './../helpers/types';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { NOT_ALLOWED_ACTION } from './../messages/index';

export async function checkTeacherOrStudentIdMatchesMiddleware(req: Request, res: Response, next: NextFunction) {
    const teacherId = req.params.teacher_id;
    const studentId = req.params.student_id;
    const uid = req.body.uid;

    if((req.body.role === roles.teacher && uid === teacherId) || (req.body.role === roles.student && uid === studentId)) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: NOT_ALLOWED_ACTION });
}