import { TRY_AGAIN_LATER } from './../../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import CommentService from '../../../../services/Comment';

class EditPost {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const commentId = req.params.comment_id;
            const comment = req.body.comment;
            const data = await CommentService.editComment({
                id: commentId,
                details: comment
            });

            return res.status(StatusCodes.OK).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default EditPost;