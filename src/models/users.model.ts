// interfaces to create, update role and paint users
export interface BodyRequestCreateUser {
    name: string,
    lastName: string,
    email: string,
    password: string
}

export interface BodyResponseCreateUser {
    message: string,
    data: Record<string, string>
}

export interface BodyResponseAllUsers {
    message: string;
    data:    Datum[];
}

export interface Datum {
    id:        string;
    role:      string;
    name:      string;
    lastName:  string;
    email:     string;
    updatedBy: null | string;
    deletedBy: null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
}

export interface BodyResponseUpdateRole {
    message: string;
    data:    Datum[];
}
