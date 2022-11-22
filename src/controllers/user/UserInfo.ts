import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { TRY_AGAIN_LATER } from '../../messages';
import UserService from '../../services/User';

class UserInfo {
    /**
     * getUserNameFromId
     */
    public static async getUserNameFromId(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const uid: string = req.params.uid;
            const user = await UserService.findById(uid);
            return res.status(StatusCodes.OK).json({ name: user.name });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default UserInfo;