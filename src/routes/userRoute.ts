// dependencies
import {Router} from 'express';
import { SignUp } from '../controllers/user';
import UserUpdate from '../controllers/user/UserUpdate';
import { authenticateMiddleware, signUpMiddleware } from '../middleware';

const userRoute: Router = Router();

// Routes
userRoute.post('/signup', signUpMiddleware, SignUp.perform);
userRoute.put('/update', authenticateMiddleware, UserUpdate.perform);

export default userRoute;