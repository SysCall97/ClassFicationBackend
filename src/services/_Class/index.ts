import { StatusCodes } from 'http-status-codes';
import mongoose from "mongoose";
import { getRandomString } from "../../helpers/randomStringGenerator";
import { ICreateClass, IJoinClass } from "../../interfaces";
import { ALREADY_JOINED_CLASS, CLASS_NOT_FOUND } from "../../messages";
import Class from "../../models/Class";
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

                await Class.create({className: data.className, uid: data.uid, code: classCode});
                await User.updateOne({id: id}, { $push: { joinedClasses: [classCode] } });
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
            try {
                const id = data.uid;
                const classCode = data.classCode;

                const isClassExists = await this.isClassExist(classCode);
                if(!isClassExists) {
                    reject({ _message: CLASS_NOT_FOUND, httpCode: StatusCodes.NOT_FOUND });
                }

                const user = await User.findById(id).select('joinedClasses');
                if(user.joinedClasses.includes(classCode)) {
                    reject({ _message: ALREADY_JOINED_CLASS, httpCode: StatusCodes.CONFLICT });
                }

                await User.updateOne({_id: id}, { $push: { joinedClasses: [classCode] } });
                resolve(data.classCode);
            } catch (error) {
                reject(error);
            }
        });
    }

    public static isClassExist(classCode: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const val = await Class.exists({code: classCode});
                resolve(!!val);
            } catch (error) {
                resolve(false);
            }

        });
    }
}


export default ClassService;