import { ICreatePost, IGetPost } from "../../interfaces";
import Post from "../../models/Post";

class PostService {
    public static async createPost(data: ICreatePost): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await Post.create({classCode: data.classCode, post: data.post, commentIds: []});
                resolve({...data, commentIds: []});
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getPost(data: IGetPost): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const posts = await Post.find({classCode: data.classCode});
                resolve({...posts});
            } catch (error) {
                reject(error);
            }
        });
    }
}


export default PostService;