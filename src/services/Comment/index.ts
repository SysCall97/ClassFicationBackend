import mongoose from "mongoose";
import { ICreateComment } from "../../interfaces";
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
                console.log(error);
                reject(error);
            }
        });
    }
}

export default CommentService;