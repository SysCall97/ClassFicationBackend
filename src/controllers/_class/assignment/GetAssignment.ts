import { IGetAssignment } from './../../../interfaces/IClass';
import { STUDENT_FORBIDDEN_ACTION } from './../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import AssignmentService from '../../../services/Assignment';

class GetAssignment {
    public static async teacherPerform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const classCode: string = req.params.class_code;
            const status: string = String(req.query.status) ?? 'present';
            const role: number = Number(req.body.role);
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
            const page: number = Number(req.query.page ?? 0);
            let limit: number = Number(req.query.limit ?? 10);

            // if(status == 'future') return res.status(StatusCodes.BAD_REQUEST).json({ message: STUDENT_FORBIDDEN_ACTION });

            const payload: IGetAssignment = {
                classCode,
                status,
                page,
                limit
            }

            const data = await AssignmentService.getStudentAssignment(payload);

            return res.status(StatusCodes.OK).json(data);
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: error });
        }
    }
}

export default GetAssignment;