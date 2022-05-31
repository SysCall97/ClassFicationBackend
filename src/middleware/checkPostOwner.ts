import PostService from '../services/Post';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { POST_ACTION_FORBIDDEN } from './../messages/index';

export async function checkPostOwnerMiddleware(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.post_id;
    const uid = req.body.uid;
    const isPostOwner = await PostService.isPostOwner({postId, uid});
    if(!!isPostOwner) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: POST_ACTION_FORBIDDEN });
}