import { ISignup, ISignin } from './../../interfaces';
import User from '../../models/User'

class userService {
    public static signUp = (data: ISignup) => {
        return User.create(data);
    }
    
    public static signIn = (data: ISignin) => {
        return User.find({ email: data.email })
    }
    
    // public static findById = (data: any) => {
    //     return User.findById(data.id);
    // }
    
    // public static logOut = (data: any) => {
    //     return Dump.create(data);
    // }
    
    // public static isDumped = (token: any) => {
    //     return Dump.find({ token: token });
    // }
}


export default userService;