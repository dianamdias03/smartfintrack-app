import { User } from "./user";

export interface BudgetGroup {
    id: number;
    name: string;
    description: string;
    budget: number;
    hasRelatedData: boolean;
    userLoginId: number;
    userLogin: User
  }