import Assignment from '../../models/Assignment';
import { ISaveSubmission, IUpdateMark } from './../../interfaces/IClass';
import Submission from '../../models/Submission';
import mongoose from "mongoose";
import { TRY_AGAIN_LATER } from '../../messages';

class SubmissionService {
    public static saveSubmission(data: ISaveSubmission): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const conn = mongoose.connection;
            const session = await conn.startSession();
            try {
                const { uid, submissionCode, assignmentCode } = data;
                const student = uid;
                session.startTransaction();
                const submission = await Submission.create({ student, submissionCode, assignmentCode });
                await Assignment.updateOne({assignmentCode: data.assignmentCode}, {$push: { submissions: [submission._id] } });
                await session.commitTransaction();
                session.endSession();
                resolve("SUCCESS");
            } catch (error: any) {
                await session.abortTransaction();
                session.endSession();
                reject(error);
            }
        });
    }

    public static updateSubmissionMark(data: IUpdateMark): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { submissionId, mark } = data;
                await Submission.findByIdAndUpdate({_id: submissionId}, {mark: mark});
                resolve("SUCCESS");
            } catch (error: any) {
                reject(error);
            }
        });
    }

    public static async getSubmissionCodeById(id: string): Promise<any> {
        try {
            const assignmentCode = await Submission.findOne({_id: id}).select('submissionCode student -_id');
            return assignmentCode;
        } catch (error) {
            return new Error(TRY_AGAIN_LATER);
        }
    }

    public static async isAlreadySubmitted(uid: string, assignmentCode: string): Promise<boolean> {
        const count = await Submission.find({ student: uid, assignmentCode: assignmentCode}).count();
        return count > 0;
    }
}

export default SubmissionService;