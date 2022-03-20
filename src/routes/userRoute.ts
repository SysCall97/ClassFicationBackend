// dependencies
import {Router} from 'express';
import { SignIn, SignOut, SignUp } from '../controllers/Auth';
import { signUpMiddleware } from '../middleware';

const userRoute: Router = Router();

// Routes
userRoute.post('/signup', signUpMiddleware, SignUp.perform);
userRoute.get('/signin', SignIn.perform);
userRoute.post('/signout', SignOut.perform);

export default userRoute;