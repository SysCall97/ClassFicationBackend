import { IGetComment } from './../../interfaces/IClass';
import mongoose from "mongoose";
import { ICheckEntityOwner, ICreateComment, IEditEntity } from "../../interfaces";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import User from '../../models/User';

class CommentService {
    public static createComment(data: ICreateComment): Promise<any> {
        return new Promise(async(resolve, reject) => {
            const conn = mongoose.connection;
            const session = await conn.startSession();
            try {
                session.startTransaction();
                const _data = await Comment.create(data);
                await Post.updateOne({_id: data.postId}, {$push: { commentIds: [_data._id] } });
                await session.commitTransaction();
                session.endSession();

                const user = await User.findById(data.uid).select('name');
                const date = new Date(_data.updatedAt);
                const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                const obj = {uid: _data.uid, userName: user?.name, _id: _data._id, comment: _data.comment, date: dateString};
                resolve(obj);
            } catch (error) {
                await session.abortTransaction();
                session.endSession();
                reject(error);
            }
        });
    }

    public static async editPost(data: IEditEntity): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const val = await Post.updateOne({_id: data.id}, { $set: { post: data.details }});
                resolve({post: data.details});
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getComment(data: IGetComment): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { postId, uid } = data;
                const comments = await Comment.find({ postId: postId, active: true });
                let _comments: any[] = await Promise.all(comments.map(async comment => {
                    const user = await User.findById(comment.uid).select('name');
                    comment.userName = user?.name;
                    const date = new Date(comment.updatedAt);
                    const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                    
                    const obj = {uid: comment.uid, userName: user?.name, _id: comment._id, comment: comment.comment, date: dateString};
                    return obj;
                }));
                resolve({_comments});
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async editComment(data: IEditEntity): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const val = await Comment.updateOne({_id: data.id}, { $set: { comment: data.details }});
                resolve({comment: data.details});
            } catch (error) {
                reject(error);
            }
        });
    }

    public static isPostExists(commentId: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                const val = await Comment.exists({_id: commentId, active: true});
                resolve(!!val);
            } catch (error) {
                resolve(false);
            }

        });
    }

    public static isCommentOwner(data: ICheckEntityOwner): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                const val = await Comment.exists({_id: data.entityId, uid: data.uid});
                resolve(!!val);
            } catch (error) {
                resolve(false);
            }

        });
    }

    public static softDelete(commentId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await Comment.updateOne({_id: commentId}, { $set: { active: false }});
                resolve(true);
            } catch (error) {
                reject();
            }
        });
    }
}

export default CommentService;