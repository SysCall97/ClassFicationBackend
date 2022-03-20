import { INVALID_EMAIL, INVALID_PASSWORD, INVALID_NAME } from './../messages/index';
import { validateEmail } from './emailValidation';
import { ISignup } from './../interfaces/IAuth';

export function signUpObjectValidation(obj: ISignup) {
    const ret = {
        status: true,
        message: '_'
    }
    if(!validateEmail(obj.email)) {
        ret.status = false,
        ret.message += INVALID_EMAIL + '_'
    }
    if(!obj.name.length) {
        ret.status = false,
        ret.message += INVALID_NAME + '_'
    }
    if(!obj.password.length) {
        ret.status = false,
        ret.message += INVALID_PASSWORD + '_';
    }

     ret.message = ret.message.substring(1).slice(0, -1).replace(/_/g, ' || ');
     return ret;
}