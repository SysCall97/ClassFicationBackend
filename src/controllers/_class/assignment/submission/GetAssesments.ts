import { IUpdateMark, IGetAssesment } from './../../../../interfaces/IClass';
import { NOT_ALLOWED_TO_SUBMIT_ASSIGNMENT, SUBMITTED_SUCCESSFULLY } from './../../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import SubmissionService from '../../../../services/Submission';
import AssignmentService from '../../../../services/Assignment';

class GetAssesments {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const teacherId = req.params.teacher_id;
            const studentId = req.params.student_id;
            const classCode = req.params.class_code;
            const payload: IGetAssesment = {
                teacherId, studentId, classCode
            }
            const data = await AssignmentService.getAssesments(payload);
            return res.status(StatusCodes.OK).json(data);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default GetAssesments;