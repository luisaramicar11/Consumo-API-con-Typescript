//interfaces to log in a user

export interface BodyRequestLogin {
    email: string,
    password: string
}

export interface BodyResponseLogin {
    message: string,
    data: Record<string, string>
}