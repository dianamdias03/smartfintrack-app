import { User } from "./user";

export interface Category{
    id: number;
    name: string;
    description: string;
    label: string;
    value: number;
    hasRelatedData: boolean;
    userLoginId: number;
    userLogin: User
}