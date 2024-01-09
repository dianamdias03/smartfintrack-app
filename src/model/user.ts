export interface User{
    id: number;
    username: number;
    password: string;
    confirmPassword: string;
    hasRelatedData: boolean;
    sucessLogin: boolean;
    errorMessage: String;
}