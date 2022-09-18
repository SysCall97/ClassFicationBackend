import { roles } from './../../helpers/types';
import Assignment from '../../models/Assignment';
import { ISaveAssignment, IGetAssignment } from './../../interfaces/IClass';

class AssignmentService {
    public static saveAssignment(data: ISaveAssignment): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { uid, classCode, startDate, lastDate, assignmentCode, title } = data;
                const teacher = uid;
                await Assignment.create({ teacher, title, classCode, startDate, lastDate, assignmentCode});
                resolve("SUCCESS");
            } catch (error: any) {
                reject(error);
            }
        });
    }

    /**
     * getTeacherAssignment
     */
    public static async getTeacherAssignment(data: IGetAssignment): Promise<any> {
        try {
            const { uid, classCode, status, page, limit } = data;
            const skip: number = page * limit;
            const date = Date.now();
            let query = Assignment.find({classCode: classCode, uid: uid, startDate: { $lte: date }, lastDate: { $gt: date }});

            if(status === 'present') query = Assignment.find({classCode: classCode, uid: uid, startDate: { $lte: date }, lastDate: { $gt: date }});
            else if(status === 'past') query = Assignment.find({classCode: classCode, uid: uid, lastDate: { $lt: date }});
            else if(status === 'future') query = Assignment.find({classCode: classCode, uid: uid, startDate: { $gt: date }});

            const assignment = await query.select('title classCode startDate lastDate')
                                        .populate('teacher', 'name')
                                        .skip(skip).limit(limit);
            return assignment;
        } catch (error: any) {
            return error;
        }
}

    /**
     * getStudentAssignment
     */
     public static async getStudentAssignment(data: IGetAssignment): Promise<any> {
        try {
            const { classCode, status, page, limit } = data;
            const skip: number = page * limit;
            const date = Date.now();
            let query = Assignment.find({classCode: classCode, startDate: { $lte: date }, lastDate: { $gt: date }});

            if(status === 'present') query = Assignment.find({classCode: classCode, startDate: { $lte: date }, lastDate: { $gt: date }});
            else if(status === 'past') query = Assignment.find({classCode: classCode, lastDate: { $lt: date }});
            else if(status === 'future') query = Assignment.find({classCode: classCode, startDate: { $gt: date }});

            const assignment = await query.select('title classCode startDate lastDate')
                                    .populate('teacher', 'name')
                                    .skip(skip).limit(limit);
            return assignment;
        } catch (error: any) {
            return error;
        }
    }
}

export default AssignmentService;