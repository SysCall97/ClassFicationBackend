import { IGetComment } from './../../../../interfaces/IClass';
import { TRY_AGAIN_LATER } from './../../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import CommentService from '../../../../services/Comment';

class GetComment {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const postId = req.params.post_id;
            const uid = req.body.uid;
            const payload: IGetComment = {postId, uid};

            const data = await CommentService.getComment(payload);

            return res.status(StatusCodes.OK).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default GetComment;