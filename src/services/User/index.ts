import { ISignup } from './../../interfaces';
import User from '../../models/User'
// const Dump = require('../models/dumpedTokenModel');

class userService {
    public static signUp = (data: ISignup) => {
        return User.create(data);
    }
    
    // public static logIn = (data: any) => {
    //     return User.find({ email: data.email })
    // }
    
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