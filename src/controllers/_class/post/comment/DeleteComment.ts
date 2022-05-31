import { COMMENT_DELETE_FAILED, COMMENT_DELETE_SUCCESSFUL } from './../../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import CommentService from '../../../../services/Comment';

class DeletePost {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const commentId = req.params.comment_id;
            await CommentService.softDelete(commentId);
            return res.status(StatusCodes.OK).json({ message: COMMENT_DELETE_SUCCESSFUL });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: COMMENT_DELETE_FAILED });
        }
    }
}

export default DeletePost;