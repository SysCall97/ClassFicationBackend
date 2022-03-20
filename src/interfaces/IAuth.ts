export interface ISignup {
    name: string,
    email: string,
    password: string
};

export interface IAuth {
    _id: string
};

export interface ISignin {
    email: string,
    password: string
}

export interface ISignout {
    token: string
}