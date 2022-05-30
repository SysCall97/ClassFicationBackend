import { TRY_AGAIN_LATER } from './../../../messages/index';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import PostService from '../../../services/Post';

class GetPost {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const classCode = req.params.class_code;
            const uid = req.body.uid;

            const data = await PostService.getPost({
                classCode,
                uid,
                role: req.body.role
            });

            return res.status(StatusCodes.OK).json({ data });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default GetPost;