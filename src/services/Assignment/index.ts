import path from 'path';
import Assignment from '../../models/Assignment';
import { ISaveAssignment } from './../../interfaces/IClass';

class AssignmentService {
    public static saveAssignment(data: ISaveAssignment): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { uid, classCode, startDate, lastDate, assignmentCode } = data;
                await Assignment.create({uid, classCode, startDate, lastDate, assignmentCode});
                resolve("SUCCESS");
            } catch (error: any) {
                reject(error);
            }
        });
    }
}

export default AssignmentService;