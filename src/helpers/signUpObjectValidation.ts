import { validatePassword, validateEmail, validateName } from './index';
import { INVALID_EMAIL, INVALID_PASSWORD, INVALID_NAME } from './../messages/index';
import { ISignup, IAuthValidation } from './../interfaces/IAuth';

export function signUpObjectValidation(obj: ISignup): IAuthValidation {
    const ret = {
        status: true,
        message: '_'
    }
    if(!validateEmail(obj.email)) {
        ret.status = false,
        ret.message += INVALID_EMAIL + '_'
    }
    if(!validateName(obj.name)) {
        ret.status = false,
        ret.message += INVALID_NAME + '_'
    }
    if(!validatePassword(obj.password)) {
        ret.status = false,
        ret.message += INVALID_PASSWORD + '_';
    }

     ret.message = ret.message.substring(1).slice(0, -1).replace(/_/g, ' || ');
     return ret;
}