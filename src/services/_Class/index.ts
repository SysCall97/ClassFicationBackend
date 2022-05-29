import { getRandomString } from "../../helpers/randomStringGenerator";
import { ICreateClass } from "../../interfaces";
import Class from "../../models/Class";

class ClassService {
    public static async createClass(data: ICreateClass): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const classCode = getRandomString(5);
                await Class.create({className: data.className, uid: data.uid, code: classCode});
                resolve(classCode);
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