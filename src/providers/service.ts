import axios from "axios"
import { Category } from "../model/category";
import { Service } from "../core/service";
import { CashFlow } from "../model/cashFlow";
import { BudgetGroup } from "../model/budgetGroups";
import { User } from "../model/user";
import { Dashboard } from "../model/dashboard";

export function createService() : Service{
    const root = "http://localhost:8080";
    //const root = "https://smartfintrack-api-production.up.railway.app";
    const instance = axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return{
        async getCategories(userLoginId){
            const response = await instance.get(`${root}/api/categories/${userLoginId}`);
            return await response.data as Category[];
        },
        async saveCategory(values){
            const response = await instance.post(`${root}/api/category`, values);
            return await response.data as Category;
        },
        async deleteCategory(ids){
            try {
              const response = await instance.delete(`${root}/api/categories`, { data: ids });
            } catch (error) {
            }
        },

        async getExpenses(userLoginId){
            const response = await instance.get(`${root}/api/expenses/${userLoginId}`);
            return await response.data as CashFlow[];
        },

        async getRevenues(userLoginId){
            const response = await instance.get(`${root}/api/revenues/${userLoginId}`);
            return await response.data as CashFlow[];
        },

        async getCashFlows(userLoginId){
            const response = await instance.get(`${root}/api/cashFlowsReport/${userLoginId}`);
            return await response.data as CashFlow[];
        },

        async saveCashFlow(values, isRevenue){
            const response = await instance.post(`${root}/api/cashFlow`, {
                ...values,
                category: {
                    id: values.category
                },
                budgetGroup: {
                    id: values.budgetGroup
                },
                revenue: isRevenue
            });
            return await response.data as CashFlow;
        },
        async deleteCashFlow(ids){
            try {
              const response = await instance.delete(`${root}/api/cashFlows`, { data: ids });
            } catch (error) {
            }
        },


        async getBudgetGroups(userLoginId){
            const response = await instance.get(`${root}/api/budgetGroups/${userLoginId}`);
            return await response.data as BudgetGroup[];
        },
        async saveBudgetGroups(values){
            const response = await instance.post(`${root}/api/budgetGroup`, values);
            return await response.data as BudgetGroup;
        },
        async deleteBudgetGroups(ids){
            try {
              const response = await instance.delete(`${root}/api/budgetGroups`, { data: ids });
            } catch (error) {
            }
        },

        async createLogin(values){
            const response = await instance.post(`${root}/api/createLogin`, {
                username: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword          
            });
            return await response.data as User;
        },

        async login(values){
            const response = await instance.get(`${root}/api/login`, {
                params: {
                    userName: values.username,
                    password: values.password
                }
            })
            return await response.data as User;
        },

        async getDashboard(userLoginId){
            const response = await instance.get(`${root}/api/dashboard/${userLoginId}`);
            return await response.data as Dashboard;
        },
    }
}