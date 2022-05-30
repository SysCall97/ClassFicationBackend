import { ICreatePost, IGetPost } from "../../interfaces";
import Post from "../../models/Post";
import User from "../../models/User";

class PostService {
    public static async createPost(data: ICreatePost): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await Post.create({classCode: data.classCode, post: data.post, uid: data.uid, commentIds: []});
                resolve({...data, commentIds: []});
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getPost(data: IGetPost): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let posts;
                if(data.role === 2) posts = await Post.find({classCode: data.classCode});
                else posts = await Post.find({classCode: data.classCode, uid: data.uid});
                let _posts: any[] = await Promise.all(posts.map(async post => {
                    const user = await User.findById(post.uid).select('name');
                    post.userName = user?.name;
                    const obj = {uid: post.uid, userName: user?.name, _id: post._id, classCode: post.classCode, post: post.post, commentIds: post.commentIds};
                    return obj;
                }));
                resolve(_posts);
            } catch (error) {
                reject(error);
            }
        });
    }

    public static isPostExists(post_id: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                const val = await Post.exists({_id: post_id});
                resolve(!!val);
            } catch (error) {
                resolve(false);
            }

        });
    }
}


export default PostService;