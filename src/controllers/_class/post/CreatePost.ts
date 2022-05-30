import { CLASS_NOT_FOUND, JOIN_THE_CLASS, TRY_AGAIN_LATER } from './../../../messages/index';
import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from "express";
import PostService from '../../../services/Post';
import UserService from '../../../services/User';
import ClassService from '../../../services/_Class';

class CreatePost {
    public static async perform(req: Request, res: Response): Promise<void> {
        try {
            const classCode = req.params.class_code;
            const uid = req.body.uid;
            
            const isClassExist = await ClassService.isClassExist(classCode);
            if(!isClassExist) {
                res.status(StatusCodes.NOT_FOUND).json({ message: CLASS_NOT_FOUND });
            }

            const isJoinedClass = await UserService.isJoinedClass({uid, classCode});
            if(!isJoinedClass) {
                res.status(StatusCodes.NOT_FOUND).json({ message: JOIN_THE_CLASS });
            }

            const data = await PostService.createPost({
                classCode,
                post: req.body.post
            });

            res.status(StatusCodes.CREATED).json({ data });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: TRY_AGAIN_LATER });
        }
    }
}

export default CreatePost;