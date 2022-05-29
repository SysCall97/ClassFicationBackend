import { IIsJoined, ISignout } from './../../interfaces/IAuth';
import { ISignup, ISignin } from './../../interfaces';
import User from '../../models/User';
import Dump from '../../models/Token';

class UserService {
    public static signUp (data: ISignup): Promise<any> {
        return User.create(data);
    }
    
    public static signIn (data: ISignin): Promise<any> {
        return new Promise((resolve, rejected) => {
            try {
                const val = User.find({ email: data.email, password: data.password, joinedClasses: [] });
                resolve(val);
            } catch (err) {
                rejected(err)
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