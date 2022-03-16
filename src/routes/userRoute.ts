// dependencies
import {Router} from 'express';
import { SignUp } from '../controllers/User';

const userRoute: Router = Router();
// const userController = require('../controllers/userController');

// Routes
userRoute.post('/signup', SignUp.perform);
// userRoute.get('/login', userController.signIn);
// userRoute.post('/logout', userController.signOut);

export default userRoute;