import { NOT_ALLOWED_ACTION } from './../../../../messages/index';
import {createReadStream} from 'fs';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { SUBMISSION_NOT_FOUND, TRY_AGAIN_LATER } from '../../../../messages';
import SubmissionService from '../../../../services/Submission';
import { roles } from '../../../../helpers';
import AssignmentService from '../../../../services/Assignment';

class GetSubmission {
    public static async getSubmissionLink(req: Request, res: Response) {
        try {
            const {submissionCode, student } = await SubmissionService.getSubmissionCodeById(req.params.submission_id);
            if(!submissionCode) return res.status(StatusCodes.NOT_FOUND).json({ message: SUBMISSION_NOT_FOUND });
            if(req.body.role === roles.student && req.body.uid != student) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: NOT_ALLOWED_ACTION });
            }
            const id = await AssignmentService.getOneTimeId(submissionCode);
            const link = `${process.env.DOMAIN}/submission/${id}`;
            return res.status(StatusCodes.OK).json({link});
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
    public static async getSubmissionPdf(req: Request, res: Response) {
        try {
            const mapId = req.params.id;
            const submissionCode = await AssignmentService.getAssignmentCodeFromMap(mapId);
            if(!submissionCode) return res.status(StatusCodes.NOT_FOUND).json({ message: SUBMISSION_NOT_FOUND });
            const stream = createReadStream(`${process.cwd()}/public/submission/submission-${submissionCode}.pdf`);
            stream.pipe(res);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default GetSubmission;