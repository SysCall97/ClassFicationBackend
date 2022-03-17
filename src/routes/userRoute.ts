// dependencies
import {Router} from 'express';
import { SignIn, SignUp } from '../controllers/User';

const userRoute: Router = Router();
// const userController = require('../controllers/userController');

// Routes
userRoute.post('/signup', SignUp.perform);
userRoute.get('/signin', SignIn.perform);
// userRoute.post('/logout', userController.signOut);

export default userRoute;