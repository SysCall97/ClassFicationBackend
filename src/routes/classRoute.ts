// dependencies
import {Router} from 'express';
import CreateClass from '../controllers/_class/CreateClass';
import JoinClass from '../controllers/_class/JoinClass';
import CreateComment from '../controllers/_class/post/comment/CreateComment';
import CreatePost from '../controllers/_class/post/CreatePost';
import DeletePost from '../controllers/_class/post/DeletePost';
import GetPost from '../controllers/_class/post/GetPost';
import { checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkPostOwnerMiddleware } from '../middleware';

const classRoute: Router = Router();

// Routes
classRoute.post('/create', CreateClass.perform);
classRoute.put('/:class_code/join', checkClassExistsMiddleware, JoinClass.perform);
classRoute.post('/:class_code/post', checkClassExistsMiddleware, checkJoinedClassMiddleware, CreatePost.perform);
classRoute.get('/:class_code/post', checkClassExistsMiddleware, checkJoinedClassMiddleware, GetPost.perform);
classRoute.delete('/:class_code/post/:post_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkPostOwnerMiddleware, DeletePost.perform);
classRoute.post('/:class_code/post/:post_id/comment', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, CreateComment.perform);

export default classRoute;