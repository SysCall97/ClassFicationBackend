import Assignment from '../../models/Assignment';
import Map from '../../models/Map'
import { ISaveSubmission } from './../../interfaces/IClass';
import Submission from '../../models/Submission';
import mongoose from "mongoose";

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
}

export default SubmissionService;