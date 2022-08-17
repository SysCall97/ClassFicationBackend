import { StatusCodes } from 'http-status-codes';
import mongoose from "mongoose";
import { roles } from '../../helpers';
import { getRandomString } from "../../helpers/randomStringGenerator";
import { ICreateClass, IJoinClass } from "../../interfaces";
import { IGetMember } from '../../interfaces/IClass';
import { ALREADY_JOINED_CLASS } from "../../messages";
import Class from "../../models/Class";
import StudentClass from '../../models/StudentClass/StudentClass';
import TeacherClass from '../../models/TeacherClass/TeacherClass';
import User from "../../models/User";


class ClassService {
    public static async createClass(data: ICreateClass): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = mongoose.connection;
            const session = await conn.startSession();

            try {
                const classCode = getRandomString(5);
                const id = data.uid
                session.startTransaction();

                await Class.create({className: data.className, uid: id, code: classCode});
                if(data.role === roles.teacher) await TeacherClass.create({
                    uid: id,
                    classCode: classCode
                });
                else await StudentClass.create({
                    uid: id,
                    classCode: classCode
                });
                await session.commitTransaction();
                session.endSession();

                resolve(classCode);
            } catch (error) {
                await session.abortTransaction();
                session.endSession();

                reject(error);
            }
        });
    }

    public static async joinClass(data: IJoinClass): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = mongoose.connection;
            const session = await conn.startSession();
            try {
                const id = data.uid;
                const classCode = data.classCode;
                const role = data.role;
                let check;
                
                if(role === roles.teacher) {
                    check = await TeacherClass.find({classCode: classCode, uid: id}).count();
                } else {
                    check = await StudentClass.find({classCode: classCode, uid: id}).count();
                }
                if(check !== 0) {
                    reject({ _message: ALREADY_JOINED_CLASS, httpCode: StatusCodes.CONFLICT });
                } else {
                    session.startTransaction();

                    if(role === roles.student) {
                        await StudentClass.create({
                            uid: id,
                            classCode: classCode
                        });
                        await Class.findOneAndUpdate(
                                {code: classCode}, 
                                { $inc: { numOfStudents: 1 } }, 
                                {new: true }
                        );
                    } else  {
                        await TeacherClass.create({
                            uid: id,
                            classCode: classCode
                        });
                        await Class.findOneAndUpdate(
                            {code: classCode}, 
                            { $inc: { numOfTeachers: 1 } }, 
                            {new: true }
                        );
                    }
                            

                    await session.commitTransaction();
                    session.endSession();
                    const className = await this.getClassName(classCode);
                    resolve({ className, classCode: data.classCode });
                }

            } catch (error) {
                await session.abortTransaction();
                session.endSession();
                reject(error);
            }
        });
    }

    public static isClassExist(classCode: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                const val = await Class.exists({code: classCode});
                resolve(!!val);
            } catch (error) {
                resolve(false);
            }

        });
    }

    public static getClassName(classCode: string): Promise<any> {
        return new Promise(async (resolve) => {
            try {
                const val = await this.findByCode(classCode);
                resolve(val.className);
            } catch (error) {
                resolve(null);
            }

        });
    }

    public static findByCode(classCode: string): Promise<any> {
        return new Promise(async (resolve) => {
            try {
                const val = await Class.findOne({code: classCode});
                resolve(val);
            } catch (error) {
                resolve(error);
            }

        });
    }

    public static getStudents(data: IGetMember): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const {page, limit, classCode} = data;
            const skip = page * limit;
            try {
                const _students = await StudentClass.find({classCode: classCode}).sort({ createdAt : -1}).skip(skip).limit(limit);

                const __students: any[] = await Promise.all(_students.map(async student => {
                    const user = await User.findById(student.uid).select('name');
                    return user;
                }));
                const students: any[] = [];
                for(let i = 0; i < __students.length; i++) {
                    if(!!__students[i]) students.push(__students[i]);
                }
                const totalLength = await StudentClass.find({classCode: classCode}).count();
                const totalGetLength = skip + _students.length;

                resolve({students, hasMore: totalGetLength < totalLength});
            } catch (error) {
                reject(error);
            }

        });
    }

    public static getTeachers(data: IGetMember): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const {page, limit, classCode} = data;
            const skip = page * limit;
            try {
                const _teachers= await TeacherClass.find({classCode: classCode}).sort({ createdAt : -1}).skip(skip).limit(limit);

                const __teachers: any[] = await Promise.all(_teachers.map(async teacher => {
                    const user = await User.findById(teacher.uid).select('name');
                    return user;
                }));
                const teachers: any[] = [];
                for(let i = 0; i < __teachers.length; i++) {
                    if(!!__teachers[i]) teachers.push(__teachers[i]);
                }
                const totalLength = await TeacherClass.find({classCode: classCode}).count();
                const totalGetLength = skip + _teachers.length;

                resolve({teachers, hasMore: totalGetLength < totalLength});
            } catch (error) {
                reject(error);
            }

        });
    }
}


export default ClassService;