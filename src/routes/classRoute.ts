// dependencies
import {Router} from 'express';
import CreateClass from '../controllers/_class/CreateClass';
import JoinClass from '../controllers/_class/JoinClass';
import CreateComment from '../controllers/_class/post/comment/CreateComment';
import DeleteComment from '../controllers/_class/post/comment/DeleteComment';
import EditComment from '../controllers/_class/post/comment/EditComment';
import CreatePost from '../controllers/_class/post/CreatePost';
import DeletePost from '../controllers/_class/post/DeletePost';
import EditPost from '../controllers/_class/post/EditPost';
import GetPost from '../controllers/_class/post/GetPost';
import GetStudents from '../controllers/_class/students/GetStudents';
import { 
    checkClassExistsMiddleware, 
    checkCommentOwnerMiddleware, 
    checkJoinedClassMiddleware, 
    checkPostExistsMiddleware, 
    checkPostOwnerMiddleware 
} from '../middleware';
import { checkCommentExistsMiddleware } from '../middleware/checkCommentExist';

const classRoute: Router = Router();

// Routes
classRoute.post('/create', CreateClass.perform);
classRoute.put('/:class_code/join', checkClassExistsMiddleware, JoinClass.perform);

classRoute.post('/:class_code/post', checkClassExistsMiddleware, checkJoinedClassMiddleware, CreatePost.perform);
classRoute.put('/:class_code/post/:post_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkPostOwnerMiddleware, EditPost.perform);
classRoute.get('/:class_code/post', checkClassExistsMiddleware, checkJoinedClassMiddleware, GetPost.perform);
classRoute.delete('/:class_code/post/:post_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkPostOwnerMiddleware, DeletePost.perform);

classRoute.post('/:class_code/post/:post_id/comment', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, CreateComment.perform);
classRoute.put('/:class_code/post/:post_id/comment/:comment_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkCommentOwnerMiddleware, checkCommentExistsMiddleware, EditComment.perform);
classRoute.delete('/:class_code/post/:post_id/comment/:comment_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkCommentOwnerMiddleware, checkCommentExistsMiddleware, DeleteComment.perform);

classRoute.get('/:class_code/students', checkClassExistsMiddleware, checkJoinedClassMiddleware, GetStudents.perform);

export default classRoute;