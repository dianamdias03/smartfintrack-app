import React from "react";
import { Category } from "../model/category";
import { CashFlow } from "../model/cashFlow";
import { BudgetGroup } from "../model/budgetGroups";
import { User } from "../model/user";

export interface Service{
    getCategories(userLoginId: number | undefined) : Promise<Category[]>;
    saveCategory(values: Category) : Promise<Category>;
    deleteCategory(ids: Number[]) : void

    getExpenses(userLoginId: number | undefined) : Promise<CashFlow[]>;
    getRevenues(userLoginId: number | undefined) : Promise<CashFlow[]>;
    getCashFlows(userLoginId: number | undefined) : Promise<CashFlow[]>;
    saveCashFlow(values: CashFlow, isRevenue: boolean) : Promise<CashFlow>;
    deleteCashFlow(ids: Number[]) : void

    getBudgetGroups(userLoginId: number | undefined) : Promise<BudgetGroup[]>;
    saveBudgetGroups(values: BudgetGroup) : Promise<BudgetGroup>;
    deleteBudgetGroups(ids: Number[]) : void

    createLogin(values: User): Promise<User>;
    login(values: User): Promise<User>;
}

export const ServiceContext = React.createContext(
    {} as Service
);