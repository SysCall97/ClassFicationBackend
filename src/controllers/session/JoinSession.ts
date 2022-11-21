import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import { ISessionAttend } from '../../interfaces/IClass';
import SessionService from '../../services/Session';
import { JOIN_SUCCESSFULLY } from '../../messages';

class JoinSession {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const payload: ISessionAttend = {
                uid: req.params.student_id,
                sessionId: req.params.session_id
            }
            const data = await SessionService.join(payload);
            return res.status(StatusCodes.CREATED).json({ message: JOIN_SUCCESSFULLY, data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default JoinSession;