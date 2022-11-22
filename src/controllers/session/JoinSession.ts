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
            return res.status(StatusCodes.OK).json({ message: JOIN_SUCCESSFULLY, data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }

    public static async getSessionList(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const page = Number(req.query.page ?? 0);
            let limit = Number(req.query.limit ?? 1);
            limit = limit <= 10 ? limit : 10;
            const data = await SessionService.getSessionLists(req.params.class_code, page, limit);

            return res.status(StatusCodes.OK).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }

    public static async getSessionCode(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const data = await SessionService.getSessionCode(req.params.session_id, req.params.class_code);
            return res.status(StatusCodes.OK).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default JoinSession;