// dependencies
import {Router} from 'express';
import CreateAssignment from '../controllers/_class/assignment/CreateAssignmnt';
import GetAssignment from '../controllers/_class/assignment/GetAssignment';
import CreateSubmission from '../controllers/_class/assignment/submission/CreateSubmission';
import GetAssesments from '../controllers/_class/assignment/submission/GetAssesments';
import GetSubmission from '../controllers/_class/assignment/submission/GetSubmissions';
import UpdateSubmission from '../controllers/_class/assignment/submission/UpdateSubmission';
import CreateClass from '../controllers/_class/CreateClass';
import JoinClass from '../controllers/_class/JoinClass';
import CreateComment from '../controllers/_class/post/comment/CreateComment';
import DeleteComment from '../controllers/_class/post/comment/DeleteComment';
import EditComment from '../controllers/_class/post/comment/EditComment';
import GetComment from '../controllers/_class/post/comment/GetComments';
import CreatePost from '../controllers/_class/post/CreatePost';
import DeletePost from '../controllers/_class/post/DeletePost';
import EditPost from '../controllers/_class/post/EditPost';
import GetPost from '../controllers/_class/post/GetPost';
import GetStudents from '../controllers/_class/students/GetStudents';
import GetTeachers from '../controllers/_class/teachers/GetTeachers';
import { uploadType } from '../helpers';
import { 
    checkClassExistsMiddleware, 
    checkCommentOwnerMiddleware, 
    checkJoinedClassMiddleware, 
    checkPostExistsMiddleware, 
    checkPostOwnerMiddleware,
    filterOutTeacher,
    filterOutStudent,
    multerGetter,
    authenticateMiddleware
} from '../middleware';
import { checkAlreadySubmited } from '../middleware/checkAlreadySubmited';
import { checkAssignmentExistMiddleware } from '../middleware/checkAssignmentExist';
import { checkAssignmentOwner } from '../middleware/checkAssignmentOwner';
import { checkCommentExistsMiddleware } from '../middleware/checkCommentExist';
import { checkTeacherOrStudentIdMatchesMiddleware } from '../middleware/checkTeacherOrStudentIdMatches';

const classRoute: Router = Router();

// Routes
classRoute.post('/create', filterOutTeacher, CreateClass.perform);
classRoute.put('/:class_code/join', checkClassExistsMiddleware, JoinClass.perform);

classRoute.post('/:class_code/post', checkClassExistsMiddleware, checkJoinedClassMiddleware, CreatePost.perform);
classRoute.put('/:class_code/post/:post_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkPostOwnerMiddleware, EditPost.perform);
classRoute.get('/:class_code/post', checkClassExistsMiddleware, checkJoinedClassMiddleware, GetPost.perform);
classRoute.delete('/:class_code/post/:post_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkPostOwnerMiddleware, DeletePost.perform);

classRoute.post('/:class_code/post/:post_id/comment', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, CreateComment.perform);
classRoute.get('/:class_code/post/:post_id/comment', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, GetComment.perform);
classRoute.put('/:class_code/post/:post_id/comment/:comment_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkCommentOwnerMiddleware, checkCommentExistsMiddleware, EditComment.perform);
classRoute.delete('/:class_code/post/:post_id/comment/:comment_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkPostExistsMiddleware, checkCommentOwnerMiddleware, checkCommentExistsMiddleware, DeleteComment.perform);

classRoute.get('/:class_code/students', checkClassExistsMiddleware, checkJoinedClassMiddleware, GetStudents.perform);
classRoute.get('/:class_code/teachers', checkClassExistsMiddleware, checkJoinedClassMiddleware, GetTeachers.perform);

// here we have to use authenticateMiddleware after multer 
// though we're using authenticateMiddleware before any route here, but we're using it twice in this API
// It's because multer is overriding the req.body attribute that's been set in the authenticateMiddleware
classRoute.post('/:class_code/teachers/assignment', filterOutStudent, checkClassExistsMiddleware, checkJoinedClassMiddleware, multerGetter(uploadType.assignment).single('file'), authenticateMiddleware, CreateAssignment.perform);
classRoute.get('/:class_code/teachers/assignment', filterOutStudent, checkClassExistsMiddleware, checkJoinedClassMiddleware, GetAssignment.teacherPerform);
classRoute.get('/:class_code/students/assignment', filterOutTeacher, checkClassExistsMiddleware, checkJoinedClassMiddleware, GetAssignment.studentPerform);
classRoute.get('/:class_code/assignments/:id', checkClassExistsMiddleware, checkJoinedClassMiddleware, GetAssignment.getAssignmentLink);

classRoute.post('/:class_code/students/assignment/:assignment_id/submission', filterOutTeacher, checkClassExistsMiddleware, checkJoinedClassMiddleware, checkAssignmentExistMiddleware, checkAlreadySubmited, multerGetter(uploadType.submission).single('file'), authenticateMiddleware, CreateSubmission.perform);
classRoute.patch('/:class_code/students/assignment/:assignment_id/submission/:submission_id', filterOutStudent, checkClassExistsMiddleware, checkJoinedClassMiddleware, checkAssignmentExistMiddleware, checkAssignmentOwner, UpdateSubmission.updateMark);
classRoute.get('/:class_code/assignments/:assignment_id/submission/:submission_id', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkAssignmentExistMiddleware, GetSubmission.getSubmissionLink);

classRoute.get('/:class_code/teachers/:teacher_id/students/:student_id/assesments', checkClassExistsMiddleware, checkJoinedClassMiddleware, checkTeacherOrStudentIdMatchesMiddleware, GetAssesments.perform);

export default classRoute;