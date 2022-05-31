import { POST_DELETE_FAILED, POST_DELETE_SUCCESSFUL } from './../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import PostService from '../../../services/Post';

class DeletePost {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const postId = req.params.post_id;
            await PostService.softDelete(postId);
            return res.status(StatusCodes.OK).json({ message: POST_DELETE_SUCCESSFUL });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: POST_DELETE_FAILED });
        }
    }
}

export default DeletePost;