// dependencies
import {Router} from 'express';
import CreateClass from '../controllers/_class/CreateClass';

const classRoute: Router = Router();

// Routes
classRoute.post('/create', CreateClass.perform);
// classRoute.post('/:class_id/post', (req, res) => res.send(req.params.class_id));
// classRoute.post('/:class_id/post/:post_id/comment');

export default classRoute;