import { Router } from "express";
import Attendance from "../controllers/session/Attendance";
import CreateSession from "../controllers/session/CreateSession";
import ExitSession from "../controllers/session/ExitSession";
import JoinSession from "../controllers/session/JoinSession";
import { authenticateMiddleware, checkClassExistsMiddleware, checkJoinedClassMiddleware, filterOutStudent, filterOutTeacher } from "../middleware";

const sessionRoute: Router = Router();
// create session
sessionRoute.post('/class/:class_code', authenticateMiddleware, filterOutStudent, checkClassExistsMiddleware, checkJoinedClassMiddleware, CreateSession.perform);

// get session list of a class
sessionRoute.get('/class/:class_code', authenticateMiddleware, checkClassExistsMiddleware, checkJoinedClassMiddleware, JoinSession.getSessionList);

// get session code
sessionRoute.get('/:session_id/class/:class_code', authenticateMiddleware, checkClassExistsMiddleware, checkJoinedClassMiddleware, JoinSession.getSessionCode);

// attend session
sessionRoute.patch('/:session_id/students/:student_id', JoinSession.perform);

// leave session
sessionRoute.delete('/:session_id/students/:student_id', ExitSession.perform);

// take attendance
sessionRoute.patch('/:session_id', Attendance.takeAttendance);


export default sessionRoute;