import { ICreateClass } from './../interfaces/IClass';
import { Router, Request, Response } from "express";
import { comment, post, users, _class } from "../database/seed";
import User from "../models/User";
import ClassService from '../services/_Class';
import Class from '../models/Class';
import PostService from '../services/Post';
import Post from '../models/Post';
import CommentService from '../services/Comment';
import Comment from '../models/Comment';

const seedRoute: Router = Router();
seedRoute.post('/', async (req: Request, res: Response) => {
    await User.deleteMany({});
    await Class.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const uData: any = await User.insertMany(users);
    _class.forEach(async cls => {
        const cData: ICreateClass = {
            className: cls.className,
            uid: uData[1]._id
        };
        const classCode = await ClassService.createClass(cData);
        await ClassService.joinClass({classCode: classCode, uid: uData[0]._id});
        await ClassService.joinClass({classCode: classCode, uid: uData[2]._id});
        const p1 = await PostService.createPost({
            classCode,
            uid: uData[0]._id,
            post: post[0].post
        });
        const p2 = await PostService.createPost({
            classCode,
            uid: uData[1]._id,
            post: post[1].post
        });

        await CommentService.createComment({
            classCode,
            postId: p1._id,
            uid: uData[2]._id,
            comment: comment[0].comment
        });
        await CommentService.createComment({
            classCode,
            postId: p2._id,
            uid: uData[1]._id,
            comment: comment[1].comment
        });
    })

    // console.log(uData[1]);
    return res.send("Seeding done");
});

export default seedRoute;