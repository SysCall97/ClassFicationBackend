import mongoose from "mongoose";
import { roles } from "../../helpers";
import { ICheckEntityOwner, ICreatePost, IEditEntity, IGetPost } from "../../interfaces";
import Class from "../../models/Class";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import User from "../../models/User";

class PostService {
    public static async createPost(data: ICreatePost): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = mongoose.connection;
            const session = await conn.startSession();
            try {
                session.startTransaction();
                const _data = await Post.create({classCode: data.classCode, post: data.post, uid: data.uid});
                await Class.findOneAndUpdate(
                    {code: data.classCode}, 
                    { $inc: { numOfPosts: 1 } }, 
                    {new: true }
                );
                const user = await User.findById(data.uid).select('name');
                await session.commitTransaction();
                session.endSession();
                const date = new Date(_data.updatedAt);
                const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                resolve({
                    uid: _data.uid,
                    userName: user?.name,
                    _id: _data._id,
                    post: _data.post,
                    date: dateString
                });
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

    public static async getPost(data: IGetPost): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let posts;
                const page = data.page, limit = data.limit;
                const skip = page * limit;
                if(data.role === roles.student) posts = await Post.find({classCode: data.classCode, active: true}).sort({ createdAt : -1}).skip(skip).limit(limit);
                else posts = await Post.find({classCode: data.classCode, uid: data.uid, active: true}).sort({ createdAt : -1}).skip(skip).limit(limit);

                let _posts: any[] = await Promise.all(posts.map(async post => {
                    const user = await User.findById(post.uid).select('name');
                    post.userName = user?.name;
                    const date = new Date(post.updatedAt);
                    const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
                    
                    const obj = {uid: post.uid, userName: user?.name, _id: post._id, post: post.post, date: dateString};
                    return obj;
                }));
                const totalGetLength = skip + _posts.length;
                let totalLength;
                if(data.role === roles.student) totalLength = await Post.find({classCode: data.classCode, active: true}).count();
                else totalLength = await Post.find({classCode: data.classCode, uid: data.uid, active: true}).count();

                resolve({_posts, hasMore: totalGetLength < totalLength});
            } catch (error) {
                reject(error);
            }
        });
    }

    public static isPostExists(postId: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                const val = await Post.exists({_id: postId, active: true});
                resolve(!!val);
            } catch (error) {
                resolve(false);
            }

        });
    }

    public static isPostOwner(data: ICheckEntityOwner): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                const val = await Post.exists({_id: data.entityId, uid: data.uid});
                resolve(!!val);
            } catch (error) {
                resolve(false);
            }

        });
    }

    public static softDelete(postId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await Post.updateOne({_id: postId}, { $set: { active: false }});
                resolve(true);
            } catch (error) {
                reject();
            }
        });
    }
}


export default PostService;