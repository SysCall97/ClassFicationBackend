import { IIsJoined, ISignout, IUpdate } from './../../interfaces/IAuth';
import { ISignup, ISignin } from './../../interfaces';
import User from '../../models/User';
import Dump from '../../models/Token';
import ClassService from '../_Class';
import TeacherClass from '../../models/TeacherClass/TeacherClass';
import StudentClass from '../../models/StudentClass/StudentClass';

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

    public static updateUser (data: IUpdate): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { _id, ...update } = data;
                const updatedUser = await User.findOneAndUpdate({ _id: _id }, update, {
                    new: true
                });

                resolve(updatedUser);
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
            let check;
            const {role, uid, classCode } = data;
            if(role === 1) {
                check = await TeacherClass.find({uid: uid, classCode: classCode}).count();
            } else {
                check = await StudentClass.find({uid: uid, classCode: classCode}).count();
            }
            return !!check;
        } catch (error) {
            return false;
        }
    }

    public static userClassDetails(id: string, role: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let userClass: any[];
                if(role === 1) {
                    userClass = await TeacherClass.find({uid: id});
                } else {
                    userClass = await StudentClass.find({uid: id});
                }
                const classes: any[] = await Promise.all(
                    userClass.map(async (_userClass: {classCode: string}) => await ClassService.findByCode(_userClass.classCode))
                );
                resolve(classes);
            } catch (error) {
                reject(error);
            }
        });
        
    }
}


export default UserService;