// dependencies
import {Router} from 'express';
import { SignUp, UserUpdate } from '../controllers/user';
import { authenticateMiddleware, signUpMiddleware } from '../middleware';

const userRoute: Router = Router();

// Routes
userRoute.post('/signup', signUpMiddleware, SignUp.perform);
userRoute.put('/update', authenticateMiddleware, UserUpdate.perform);

export default userRoute;