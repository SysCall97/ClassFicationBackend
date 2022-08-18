import { ISaveAssignment } from './../../../interfaces/IClass';
import { ASSIGNED_SUCCESSFULLY, TRY_AGAIN_LATER } from './../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import AssignmentService from '../../../services/Assignment';
import { roles } from '../../../helpers';

class CreateAssignment {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const classCode = req.params.class_code;
            const payload: ISaveAssignment = {
                classCode,
                uid: req.body.uid,
                lastDate: req.body.lastDate,
                assignmentCode: req.body.assignmentCode
            }

            const data = await AssignmentService.saveAssignment(payload);
            return res.status(StatusCodes.CREATED).json({ message: ASSIGNED_SUCCESSFULLY });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default CreateAssignment;