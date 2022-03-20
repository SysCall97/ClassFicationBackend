// dependencies
import {Router} from 'express';
import { SignIn, SignOut, SignUp } from '../controllers/User';

const userRoute: Router = Router();

// Routes
userRoute.post('/signup', SignUp.perform);
userRoute.get('/signin', SignIn.perform);
userRoute.post('/signout', SignOut.perform);

export default userRoute;