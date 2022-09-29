interface IPagination {
    page: number,
    limit: number
};

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

export interface IGetPost extends IPagination {
    classCode: string,
    uid: string,
    role: number,
}

export interface ICreateComment {
    classCode: string,
    postId: string,
    uid: string,
    comment: string
}

export interface IGetComment {
    uid: string,
    postId: string
}

export interface ICheckEntityOwner {
    entityId: string,
    uid: string,
}
export interface IEditEntity {
    id: string,
    details: string
}

export interface IGetMember extends IPagination {
    classCode: string
}

export interface ISaveAssignment {
    title: string,
    classCode: string,
    assignmentCode: string,
    startDate: Date,
    lastDate: Date,
    uid: string
}

export interface IGetAssignment extends IPagination {
    classCode: string,
    status: string,
    uid: string,
}

export interface ICheckAssignment {
    classCode: string,
    assignmentId: string
}

export interface ISaveSubmission {
    assignmentCode: string,
    submissionCode: string,
    uid: string,
}