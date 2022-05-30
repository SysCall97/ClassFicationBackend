import { CLASS_CODE_REQUIRED, CLASS_JOIN_FAILED } from './../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import ClassService from '../../services/_Class';

class JoinClass {
    public static async perform(req: Request, res: Response): Promise<void> {
        try {
            if(req.params.class_code === '' || !req.params.class_code) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: CLASS_CODE_REQUIRED});
            }
            
            const data = await ClassService.joinClass({
                classCode: req.params.class_code,
                uid: req.body.uid
            });
            res.status(StatusCodes.CREATED).json({ classCode: data });

        } catch (error: any) {
            res.status(error.httpCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ message:  error._message || CLASS_JOIN_FAILED });
        }
    }
}

export default JoinClass;