import { StatusCodes } from 'http-status-codes';
// dependencies
import {Router, Request, Response} from 'express';
import { SignIn, SignOut } from '../controllers/user';
import { authenticateMiddleware, signInMiddleware } from '../middleware';
import { TOKEN_STILL_ALIVE } from '../messages';

const authRoute: Router = Router();

// Routes
authRoute.post('/signin', signInMiddleware, SignIn.perform);
authRoute.post('/signout', SignOut.perform);
authRoute.get('/check_token', authenticateMiddleware, (req: Request, res: Response) => res.status(StatusCodes.ACCEPTED).json({ message: TOKEN_STILL_ALIVE }));

export default authRoute;