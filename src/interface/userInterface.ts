export interface IUser {
    id:number
    userId ?: number
    firstname?: string
    lastname?: string
    email?: string
    password: string
    isadmin?: boolean
}

export interface loginUser {
    email: string,
    password: string
}

export interface IPayload{
    id: number,
    admin?: boolean
}