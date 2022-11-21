import { Router } from "express";
import { authenticateMiddleware } from "../middleware";
import authRoute from "./authRoute";
import seedRoute from "./seedRoute";
import userRoute from "./userRoute";
import classRoute from './classRoute';
import sessionRoute from "./sessionRoute";


export const router: Router = Router();
router.use('/seed', seedRoute)
router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/class', authenticateMiddleware, classRoute);
router.use('/session', sessionRoute);