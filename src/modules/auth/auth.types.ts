export interface RegisterUserInput {
    name: string,
    email: string,
    password: string
}

export interface PublicUser {
    id: number,
    name: string,
    email: string,
    created_at: Date,
}