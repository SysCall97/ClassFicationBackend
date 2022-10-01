import { IUpdateMark } from './../../../../interfaces/IClass';
import { NOT_ALLOWED_TO_SUBMIT_ASSIGNMENT, SUBMITTED_SUCCESSFULLY } from './../../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import SubmissionService from '../../../../services/Submission';
import AssignmentService from '../../../../services/Assignment';

class UpdateSubmission {
    public static async updateMark(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const submissionId = req.params.submission_id;
            const mark = req.body.mark;
            const payload: IUpdateMark = {
                submissionId, mark
            }
            const _res = await SubmissionService.updateSubmissionMark(payload);
            return res.status(StatusCodes.OK).json(_res);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default UpdateSubmission;