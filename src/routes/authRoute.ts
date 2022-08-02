// dependencies
import {Router} from 'express';
import { SignIn, SignOut } from '../controllers/user';
import { signInMiddleware } from '../middleware';

const authRoute: Router = Router();

// Routes
authRoute.post('/signin', signInMiddleware, SignIn.perform);
authRoute.post('/signout', SignOut.perform);

export default authRoute;