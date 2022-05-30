import { IIsJoined, ISignout } from './../../interfaces/IAuth';
import { ISignup, ISignin } from './../../interfaces';
import User from '../../models/User';
import Dump from '../../models/Token';

class UserService {
    public static signUp (data: ISignup): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const isExist = await User.exists({email: data.email});
                if(!isExist) {
                    const user = await User.create(data);
                    resolve(user);
                } else {
                    reject({code: 11000});
                }
            } catch (error) {
                reject({});
            }
        });
    }
    
    public static signIn (data: ISignin): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const val = User.find({ email: data.email, password: data.password });
                resolve(val);
            } catch (err) {
                reject(err)
            }
        });
    }
    
    public static async findById(id: string): Promise<any> {
        const user = await User.findById(id);
        return user;
    }
    
    public static signOut (data: ISignout): Promise<any> {
        return Dump.create(data);
    }

    public static async isJoinedClass(data: IIsJoined): Promise<boolean> {
        try {
            const user = await this.findById(data.uid);
            if(!user) return false;
            return user.joinedClasses.includes(data.classCode)
        } catch (error) {
            return false;
        }
    }
}


export default UserService;