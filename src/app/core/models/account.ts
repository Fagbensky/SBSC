export interface AccountRequest {
    avatar: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    address: string,
    job: string,
}

export interface AccountResponse {
    avatar: string,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    address: string,
    job: string,
    id: number,
    createdAt: string | null
    updatedAt: string | null
}