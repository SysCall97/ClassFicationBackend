export interface ICreateClass {
    className: string,
    uid: string,
    role: number
};

export interface ICreatePost {
    classCode: string,
    uid: string,
    post: string
}

export interface IJoinClass {
    classCode: string,
    role: number,
    uid: string
}

export interface IGetPost {
    classCode: string,
    uid: string,
    role: number,
    page: number,
    limit: number
}

export interface ICreateComment {
    classCode: string,
    postId: string,
    uid: string,
    comment: string
}

export interface ICheckEntityOwner {
    entityId: string,
    uid: string,
}
export interface IEditEntity {
    id: string,
    details: string
}

export interface IGetMember {
    classCode: string,
    page: number,
    limit: number
}