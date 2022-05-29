// dependencies
import {Router} from 'express';

const classRoute: Router = Router();

// Routes
classRoute.post('/create');
classRoute.post('/post');
classRoute.post('/comment');

export default classRoute;