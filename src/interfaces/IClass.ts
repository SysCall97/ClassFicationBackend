export interface ICreateClass {
    className: string,
    uid: string
};

export interface ICreatePost {
    classCode: string,
    uid: string,
    post: string
}

export interface IJoinClass {
    classCode: string,
    uid: string
}

export interface IGetPost {
    classCode: string,
    uid: string,
    role: number
}

export interface ICreateComment {
    classCode: string,
    postId: string,
    uid: string,
    comment: string
}

export interface ICheckPostOwner {
    postId: string,
    uid: string,
}