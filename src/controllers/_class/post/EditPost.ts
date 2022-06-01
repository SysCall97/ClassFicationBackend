import { TRY_AGAIN_LATER } from './../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import PostService from '../../../services/Post';

class EditPost {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const postId = req.params.post_id;
            const post = req.body.post;
            const data = await PostService.editPost({
                id: postId,
                details: post
            });

            return res.status(StatusCodes.OK).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default EditPost;