import mongoose from "mongoose";
import { ICheckEntityOwner, ICreateComment } from "../../interfaces";
import Comment from "../../models/Comment";
import Post from "../../models/Post";

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
                resolve(_data);
            } catch (error) {
                await session.abortTransaction();
                session.endSession();
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