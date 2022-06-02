// dependencies
import {Router} from 'express';
import { SignUp } from '../controllers/user';
import { signUpMiddleware } from '../middleware';

const userRoute: Router = Router();

// Routes
userRoute.post('/signup', signUpMiddleware, SignUp.perform);

export default userRoute;