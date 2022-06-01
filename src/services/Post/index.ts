import { ICheckEntityOwner, ICreatePost, IEditEntity, IGetPost } from "../../interfaces";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import User from "../../models/User";

class PostService {
    public static async createPost(data: ICreatePost): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await Post.create({classCode: data.classCode, post: data.post, uid: data.uid, commentIds: []});
                resolve({...data, comments: []});
            } catch (error) {
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
                if(data.role === 2) posts = await Post.find({classCode: data.classCode, active: true}).sort({ createdAt : -1});
                else posts = await Post.find({classCode: data.classCode, uid: data.uid, active: true}).sort({ createdAt : -1});

                let _posts: any[] = await Promise.all(posts.map(async post => {
                    const user = await User.findById(post.uid).select('name');
                    post.userName = user?.name;
                    const commentIds = post.commentIds;
                    let comments = await Promise.all(commentIds.map(async (commentId: any) => {
                        const comment = await Comment.findById(commentId);
                        if(comment.active === true) {
                            const user = await User.findById(comment.uid).select('name');
                            return { commentId: comment._id, comment: comment.comment, userName: user.name };
                        }
                    }
                    ));
                    comments = comments.filter(Boolean)
                    const obj = {uid: post.uid, userName: user?.name, _id: post._id, classCode: post.classCode, post: post.post, comments};
                    return obj;
                }));
                
                resolve(_posts);
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