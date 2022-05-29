const jwt = require('jsonwebtoken');
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from "express";
import Token from '../services/Token';
import { UNAUTHORIZED_USER } from './../messages/index';

export async function authenticateMiddleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers.authorization?.split(' ')[1]!;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const blackListed = await Token.isDumped(token);
        
        if (!!blackListed) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: UNAUTHORIZED_USER });
        } else {
            req.body.email = decodedToken.email;
            req.body.name = decodedToken.name;
            req.body.role = decodedToken.role;
            next();
        }
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error });
    }
}