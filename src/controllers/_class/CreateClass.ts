import { CLASS_CREATE_FAILED, CLASS_NAME_REQUIRED } from './../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import ClassService from '../../services/_Class';

class CreateClass {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            if(req.body.className === '' || !req.body.className) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: CLASS_NAME_REQUIRED});
            }
            const data = await ClassService.createClass({
                className: req.body.className,
                uid: req.body.uid,
                role: req.body.role
            });
            return res.status(StatusCodes.CREATED).json({ classCode: data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: CLASS_CREATE_FAILED });
        }
    }
}

export default CreateClass;