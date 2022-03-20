import { validatePassword, validateEmail } from './index';
import { INVALID_EMAIL, INVALID_PASSWORD } from './../messages/index';
import { IAuthValidation, ISignin } from './../interfaces/IAuth';

export function signInObjectValidation(obj: ISignin): IAuthValidation {
    const ret = {
        status: true,
        message: '_'
    }
    if(!validateEmail(obj.email)) {
        ret.status = false,
        ret.message += INVALID_EMAIL + '_'
    }
    if(!validatePassword(obj.password)) {
        ret.status = false,
        ret.message += INVALID_PASSWORD + '_';
    }

     ret.message = ret.message.substring(1).slice(0, -1).replace(/_/g, ' || ');
     return ret;
}