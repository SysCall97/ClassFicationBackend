import { TRY_AGAIN_LATER } from './../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import PostService from '../../../services/Post';

class CreatePost {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const classCode = req.params.class_code;
            const uid = req.body.uid;
            const data = await PostService.createPost({
                classCode,
                uid,
                post: req.body.post
            });

            return res.status(StatusCodes.CREATED).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default CreatePost;