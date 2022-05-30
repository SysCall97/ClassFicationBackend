import { TRY_AGAIN_LATER } from './../../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import CommentService from '../../../../services/Comment';

class CreateComment {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const classCode = req.params.class_code;
            const uid = req.body.uid;
            const data = await CommentService.createComment({
                classCode,
                uid,
                postId: req.params.post_id,
                comment: req.body.comment
            });

            return res.status(StatusCodes.CREATED).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default CreateComment;