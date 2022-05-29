export interface ISignup {
    name: string,
    email: string,
    role: number,
    password: string
};

export interface IAuth {
    role: any
    email: any
    name: any
    _id: string
};

export interface ISignin {
    email: string,
    password: string
}

export interface ISignout {
    token: string
}

export interface IAuthValidation {
    status: Boolean,
    message: string
}