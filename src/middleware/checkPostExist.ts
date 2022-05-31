import PostService from '../services/Post';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { POST_NOT_FOUNT } from './../messages/index';

export async function checkPostExistsMiddleware(req: Request, res: Response, next: NextFunction) {
    const postId = req.params.post_id;
    const isPostExists = await PostService.isPostExists(postId);
    if(!!isPostExists) next();
    else return res.status(StatusCodes.NOT_FOUND).json({ message: POST_NOT_FOUNT });
}