import { TRY_AGAIN_LATER } from '../../messages/index';
import {Request, Response} from 'express';
import UserService from '../../services/User';
import { StatusCodes } from 'http-status-codes';

class UserJoinedClassDetails {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const body = req.body;
            const uid = body.uid;
            const role = body.role;

            const data: any = await UserService.userClassDetails(uid, role);
            const response = [];
            for (const _class of data) {
                if(!_class) continue;
                response.push({
                    className: _class.className,
                    classCode: _class.code,
                    numOfStudents: _class.numOfStudents,
                    numOfTeachers: _class.numOfTeachers,
                    numOfPosts: _class.numOfPosts
                })
            }
            return res.status(StatusCodes.OK).json(response);
        } catch (err: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err?.message || TRY_AGAIN_LATER });
        }
    }
}

export default UserJoinedClassDetails;
