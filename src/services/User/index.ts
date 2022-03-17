import { ISignup, ISignin } from './../../interfaces';
import User from '../../models/User'

class UserService {
    public static signUp = (data: ISignup): Promise<any> => {
        return User.create(data);
    }
    
    public static signIn = (data: ISignin): Promise<any> => {
        console.log(data);
        return User.find({ email: data.email, password: data.password })
    }
    
    // public static findById = (data: any): Promise<any> => {
    //     return User.findById(data.id);
    // }
    
    // public static logOut = (data: any): Promise<any> => {
    //     return Dump.create(data);
    // }
    
    // public static isDumped = (token: any): Promise<any> => {
    //     return Dump.find({ token: token });
    // }
}


export default UserService;