import Assignment from '../../models/Assignment';
import Map from '../../models/Map'
import { ISaveAssignment, IGetAssignment, ICheckAssignment } from './../../interfaces/IClass';
import { TRY_AGAIN_LATER } from '../../messages';

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

            if(status === 'present') query = Assignment.find({classCode: classCode, startDate: { $lte: date }, lastDate: { $gt: date }}).select('title classCode startDate lastDate');
            else if(status === 'past') query = Assignment.find({classCode: classCode, lastDate: { $lt: date }}).select('title classCode startDate lastDate');
            else if(status === 'future') query = Assignment.find({classCode: classCode, startDate: { $gt: date }}).select('title classCode startDate lastDate -_id');

            const assignments = await query.populate('teacher', 'name')
                                    .skip(skip).limit(limit);
            return assignments;
        } catch (error: any) {
            return error;
        }
    }

    /**
     * getAssignmentCodeById
     */
    public static async getAssignmentCodeById(id: string, classCode: string): Promise<any> {
        try {
            const assignmentCode = await Assignment.find({_id: id, classCode: classCode}).select('assignmentCode startDate -_id');
            return assignmentCode[0];
        } catch (error) {
            return new Error(TRY_AGAIN_LATER);
        }
    }

    /**
     * getOneTimeId
     */
    public static async getOneTimeId(assignmentCode: string): Promise<any> {
        try {
            const data = await Map.create({value: assignmentCode});
            return data._id;
        } catch (error) {
            return error;
        }
    }

    /**
     * getAssignmentCodeFromMap
     */
    public static async getAssignmentCodeFromMap(mapId: string): Promise<any> {
        try {
            const data = await Map.findById(mapId);
            if(!!data) {
                await Map.findByIdAndDelete(mapId);
                return data.value;
            }
        } catch (error) {
            return error;
        }
    }

    /**
     * isAssignmentExists
     */
    public static async isAssignmentExists(payload: ICheckAssignment): Promise<boolean> {
        const { classCode, assignmentId } = payload;
        const count = await Assignment.find({ classCode: classCode, _id: assignmentId}).count();
        return count > 0;
    }
}

export default AssignmentService;