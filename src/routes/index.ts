import { Router } from "express";
import { authenticateMiddleware } from "../middleware";
import authRoute from "./authRoute";
import seedRoute from "./seedRoute";
import userRoute from "./userRoute";
import classRoute from './classRoute';

import fs from 'fs';
import { Request, Response} from 'express';


export const router: Router = Router();
router.use('/seed', seedRoute)
router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/class', authenticateMiddleware, classRoute);

router.get('/download', (req: Request, res: Response) => {
    const file = process.cwd() + "/public/OOP-course-payment.pdf";
    res.end(file);
    // fs.readFile(file, (err, content) => {
    //     if(err) {
    //         res.writeHead(404, {'content-type': 'text/html'});
    //         res.end("<h1>No Such file</h1>");
    //     }
    //     res.writeHead(200, {'content-type': 'application/pdf'});
    //     res.end(content);
    // });
});