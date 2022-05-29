// dependencies
import {Router} from 'express';
import CreateClass from '../controllers/_class/CreateClass';
import CreatePost from '../controllers/_class/post/CreatePost';

const classRoute: Router = Router();

// Routes
classRoute.post('/create', CreateClass.perform);
// classRoute.put('/:class_code/join', JoinClass.perform);
classRoute.post('/:class_code/post', CreatePost.perform);
// classRoute.post('/:class_id/post/:post_id/comment');

export default classRoute;