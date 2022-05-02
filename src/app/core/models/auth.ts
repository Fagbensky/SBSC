export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    id: number | null | undefined;
    token: string;
}