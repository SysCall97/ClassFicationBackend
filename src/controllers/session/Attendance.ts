import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import SessionService from "../../services/Session";

class Attendance {
    public static async takeAttendance(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const data = await SessionService.takeAttendance(req.params.session_id);
            return res.status(StatusCodes.CREATED).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
        }
    }
}

export default Attendance;