import { ISignout } from './../../interfaces/IAuth';
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
                const val = User.find({ email: data.email, password: data.password });
                resolve(val);
            } catch (err) {
                rejected(err)
            }
        });
    }
    
    // public static findById = (data: any): Promise<any> => {
    //     return User.findById(data.id);
    // }
    
    public static signOut (data: ISignout): Promise<any> {
        return Dump.create(data);
    }
}


export default UserService;