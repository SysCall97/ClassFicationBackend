import { getRandomString } from "../../helpers/randomStringGenerator";
import { ICreateSession, ISessionAttend } from "../../interfaces/IClass";
import Session from "../../models/Session";

class SessionService {
    /**
     * create
     */
    public static async create(data: ICreateSession): Promise<any> {
        try {
            const { uid, startDate, classCode } = data;
            const teacher = uid;
            const sessionCode = getRandomString(10);
            const session = await Session.create({ teacher, startDate, classCode, sessionCode });
            return session;
        } catch (error) {
            return error;
        }
    }

    /**
     * join
     */
    public static async join(data: ISessionAttend): Promise<any> {
        try {
            const { uid, sessionId } = data;
            await Session.updateOne({_id: sessionId}, {$push: { attendee: [uid] } });
            return "SUCCESS"
        } catch (error) {
            return error;
        }
    }

    /**
     * exit
     */
    public static async exit(data: ISessionAttend): Promise<any> {
        try {
            const { uid, sessionId } = data;
            await Session.updateOne({ _id: sessionId }, { $pull: { attendee: uid } });
            return "SUCCESS"
        } catch (error) {
            return error;
        }
    }

    /**
     * takeAttendance
     */
    public static async takeAttendance(sessionId: string): Promise<any> {
        try {
            await Session.updateOne({_id: sessionId}, [{
                "$set": {
                    finalAttendee: {
                        $map: {
                            input: "$attendee",
                            as: "profile",
                            in: "$$profile"
                        }
                    }
                }
            }]);
            return "SUCCESS";
        } catch (error) {
            return error;
        }
    }

    /**
     * getSessionLists
     */
    public static async getSessionLists(classCode: string): Promise<any> {
        try {
            const data = await Session.find({ classCode: classCode }).select('startDate').populate('teacher', 'name');
            return data;
        } catch (error) {
            return error;
        }
    }

    /**
     * getSessionCode
     */
    public static async getSessionCode(sessionId: string, classCode: string): Promise<any> {
        try {
            const data = await Session.findOne({ _id: sessionId, classCode: classCode }).select('sessionCode -_id');
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default SessionService;