import { ISaveSubmission } from './../../../../interfaces/IClass';
import { NOT_ALLOWED_TO_SUBMIT_ASSIGNMENT, SUBMITTED_SUCCESSFULLY } from './../../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import SubmissionService from '../../../../services/Submission';
import AssignmentService from '../../../../services/Assignment';

class CreateSubmission {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const { assignmentCode, startDate } = await AssignmentService.getAssignmentCodeById(req.params.assignment_id, req.params.class_code);
            const date = Date.now();
            if(date < startDate) return res.status(StatusCodes.FORBIDDEN).json({ message: NOT_ALLOWED_TO_SUBMIT_ASSIGNMENT });

            const payload: ISaveSubmission = {
                assignmentCode,
                submissionCode: req.body.submissionCode,
                uid: req.body.uid
            }

            const data = await SubmissionService.saveSubmission(payload);
            return res.status(StatusCodes.CREATED).json({ message: SUBMITTED_SUCCESSFULLY });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default CreateSubmission;