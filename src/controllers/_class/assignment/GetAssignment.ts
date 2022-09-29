import { IGetAssignment } from './../../../interfaces/IClass';
import {createReadStream} from 'fs';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import AssignmentService from '../../../services/Assignment';
import { ASSIGNMENT_NOT_FOUND, TRY_AGAIN_LATER, NOT_ALLOWED_TO_SEE_ASSIGNMENT } from '../../../messages';
import { roles } from '../../../helpers';

class GetAssignment {
    public static async teacherPerform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const classCode: string = req.params.class_code;
            const status: string = String(req.query.status) ?? 'present';
            const uid: string = req.body.uid;
            const page: number = Number(req.query.page ?? 0);
            let limit: number = Number(req.query.limit ?? 10);

            const payload: IGetAssignment = {
                classCode,
                status,
                uid,
                page,
                limit
            }

            const data = await AssignmentService.getTeacherAssignment(payload);

            return res.status(StatusCodes.OK).json(data);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
        }
    }

    public static async studentPerform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const classCode: string = req.params.class_code;
            const status: string = String(req.query.status) ?? 'present';
            const uid: string = req.body.uid;
            const page: number = Number(req.query.page ?? 0);
            let limit: number = Number(req.query.limit ?? 10);

            // if(status == 'future') return res.status(StatusCodes.BAD_REQUEST).json({ message: STUDENT_FORBIDDEN_ACTION });

            const payload: IGetAssignment = {
                classCode,
                status,
                uid,
                page,
                limit
            }

            const data = await AssignmentService.getStudentAssignment(payload);

            return res.status(StatusCodes.OK).json(data);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
        }
    }

    /**
     * getAssignment
     */
    public static async getAssignmentLink(req: Request, res: Response) {
        try {
            const {assignmentCode, startDate } = await AssignmentService.getAssignmentCodeById(req.params.id, req.params.class_code);
            if(!assignmentCode) return res.status(StatusCodes.NOT_FOUND).json({ message: ASSIGNMENT_NOT_FOUND });
            if(req.body.role === roles.student) {
                const date = Date.now();
                if(date < startDate) return res.status(StatusCodes.FORBIDDEN).json({ message: NOT_ALLOWED_TO_SEE_ASSIGNMENT });
            }
            const id = await AssignmentService.getOneTimeId(assignmentCode);
            const link = `${process.env.DOMAIN}/assignment/${id}`;
            return res.status(StatusCodes.OK).json({link});
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
    public static async getAssignmentPdf(req: Request, res: Response) {
        try {
            const mapId = req.params.map_id;
            const assignmentCode = await AssignmentService.getAssignmentCodeFromMap(mapId);
            if(!assignmentCode) return res.status(StatusCodes.NOT_FOUND).json({ message: ASSIGNMENT_NOT_FOUND });
            const stream = createReadStream(`${process.cwd()}/public/assignment/assignment-${assignmentCode}.pdf`);
            stream.pipe(res);
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default GetAssignment;