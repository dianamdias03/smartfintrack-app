import { PaymentStatus } from "./paymentStatus";
import { Category } from "./category";
import { BudgetGroup } from "./budgetGroups";
import { User } from "./user";

export interface CashFlow {
    id: number;
    name: string;
    description: string;
    creationDate: Date;
    transactionDate: Date;
    paymentStatus: PaymentStatus;
    category: Category;
    budgetGroup: BudgetGroup;
    cashFlowValue: number;
    remainingBudget: number;
    revenue: boolean;
    userLoginId: number;
    userLogin: User
  }