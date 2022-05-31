import CommentService from '../services/Comment';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { COMMENT_NOT_FOUNT } from './../messages/index';

export async function checkCommentExistsMiddleware(req: Request, res: Response, next: NextFunction) {
    const commentId = req.params.comment_id;
    const isCommentExists = await CommentService.isPostExists(commentId);
    if(!!isCommentExists) next();
    else return res.status(StatusCodes.NOT_FOUND).json({ message: COMMENT_NOT_FOUNT });
}