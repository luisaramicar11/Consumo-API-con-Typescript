export interface BodyRequestLogin {
    email: string,
    password: string
}

export interface BodyResponseLogin {
    message: string,
    data: Record<string, string>
}