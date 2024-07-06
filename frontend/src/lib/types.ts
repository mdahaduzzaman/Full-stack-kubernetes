export type SignupType = {
    first_name: string
    last_name: string
    email: string
    password: string
}
export type LoginType = {
    username: string
    password: string
}

export type BookType = {
    id?: number
    name: string
    price: number
    created_at: string
    updated_at: string
    author: number
}
export type LogoutFunction = () => void;
