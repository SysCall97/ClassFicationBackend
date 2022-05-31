import CommentService from '../services/Comment';
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { COMMENT_ACTION_FORBIDDEN } from './../messages/index';

export async function checkCommentOwnerMiddleware(req: Request, res: Response, next: NextFunction) {
    const entityId = req.params.comment_id;
    const uid = req.body.uid;
    const isCommentOwner = await CommentService.isCommentOwner({entityId, uid});
    if(!!isCommentOwner) next();
    else return res.status(StatusCodes.FORBIDDEN).json({ message: COMMENT_ACTION_FORBIDDEN });
}