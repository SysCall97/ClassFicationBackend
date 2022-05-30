import { ICreatePost } from "../../interfaces";
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
}


export default PostService;