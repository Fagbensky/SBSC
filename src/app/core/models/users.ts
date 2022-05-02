import { support } from "./support"

export interface usersList {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: singleUser[],
    support: support
}

export interface singleUser {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    phone_number: string | null | undefined,
    address: string | null | undefined,
    job: string | null | undefined,
    avatar: string,
    createdAt: string | null | undefined,
    updatedAt: string | null | undefined
}

export interface singleUserApi {
    data: singleUser,
    support: support
}