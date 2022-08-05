import { validatePassword } from './../../helpers/passwordValidation';
import { validateEmail } from './../../helpers/emailValidation';
import { validateName } from './../../helpers/nameValidation';
import { PROVIDE_UPDATE_USER_DATA, UPDATE_ERROR, UPDATE_SUCCESSFULL } from '../../messages/index';
import {Request, Response} from 'express';
import crypto from 'crypto';
import UserService from '../../services/User';
import { IAuth, IUpdate } from '../../interfaces';
import Token from '../../services/Token';
import { StatusCodes } from 'http-status-codes';

class UserUpdate {
    public static async perform(req: Request, res: Response): Promise< Response<any, Record<string, any>> > {
        try {
            const body = req.body;
            const updatedData: IUpdate = {_id: body.uid};

            if(validateName(req.body.updatedName ?? '')) updatedData['name'] = body.updatedName;
            if(validateEmail(req.body.updatedEmail ?? '')) updatedData['email'] = body.updatedEmail;
            if(validatePassword(req.body.updatedPassword ?? '')) updatedData['password'] = crypto.createHash('md5').update(body.updatedPassword).digest('hex');
            if(validateName(req.body.updatedRole ?? -1)) updatedData['role'] = body.updatedRole;

            if(!('name' in updatedData || 'email' in updatedData || 'password' in updatedData || 'role' in updatedData)) {
                return res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: PROVIDE_UPDATE_USER_DATA });
            }

            const data: IAuth = await UserService.updateUser(updatedData);

            const token: string = Token.getToken(data);
            return res.status(StatusCodes.CREATED).json({ 
                message: UPDATE_SUCCESSFULL,
                name: data.name,
                uid: data._id,
                email: data.email,
                role: data.role,
                token
            });
        } catch (err: any) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: UPDATE_ERROR });
        }
    }
}

export default UserUpdate;
