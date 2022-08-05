// dependencies
import {Router} from 'express';
import { SignUp, UserJoinedClassDetails, UserUpdate } from '../controllers/user';
import { authenticateMiddleware, signUpMiddleware } from '../middleware';

const userRoute: Router = Router();

// Routes
userRoute.post('/signup', signUpMiddleware, SignUp.perform);
userRoute.put('/update', authenticateMiddleware, UserUpdate.perform);
userRoute.get('/class_list', authenticateMiddleware, UserJoinedClassDetails.perform)

export default userRoute;