// dependencies
import {Router} from 'express';
import { SignIn, SignOut, SignUp } from '../controllers/auth';
import { signInMiddleware, signUpMiddleware } from '../middleware';

const userRoute: Router = Router();

// Routes
userRoute.post('/signup', signUpMiddleware, SignUp.perform);
userRoute.get('/signin', signInMiddleware, SignIn.perform);
userRoute.post('/signout', SignOut.perform);

export default userRoute;