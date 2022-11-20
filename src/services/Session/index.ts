import { ICreateSession, ISessionAttend } from "../../interfaces/IClass";
import Session from "../../models/Session";

class SessionService {
    /**
     * create
     */
    public static async create(data: ICreateSession): Promise<any> {
        try {
            const { uid, startDate } = data;
            const teacher = uid;
            const session = await Session.create({ teacher, startDate });
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
            await Session.updateOne({_id: sessionId}, {$pop: { attendee: [uid] } });
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
            await Session.updateOne({_id: sessionId}, {
                $set: {
                    finalAttendee: {
                        $map: {
                            input: "$attendee"
                        }
                    }
                }
            });
            return "SUCCESS";
        } catch (error) {
            return error;
        }
    }
}

export default SessionService;