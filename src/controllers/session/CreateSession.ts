import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { ICreateSession } from '../../interfaces/IClass';
import SessionService from '../../services/Session';
import { SESSEION_CREATED_SUCCESSFULLY } from '../../messages';

class CreateSession {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const payload: ICreateSession = {
                uid: req.body.uid,
                startDate: req.body.startDate,
                classCode: req.params.class_code
            }
            const data = await SessionService.create(payload);
            return res.status(StatusCodes.CREATED).json({ message: SESSEION_CREATED_SUCCESSFULLY });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default CreateSession;