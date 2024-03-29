import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../core/service";
import { BudgetGroup } from "../model/budgetGroups";

export const useGroups = (userLoginId: number | undefined) => {
    const { getBudgetGroups } = useContext(ServiceContext);
    const [groupsWithBudget, setGroupsWithBudget] = useState<BudgetGroup[]>([]);
    const [groupsWithName, setGroupsWithName] = useState<BudgetGroup[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    useEffect(() => {
        getBudgetGroups(userLoginId).then((response) => {
            setGroupsWithBudget(response.map((item) => {
                return {
                  ...item,
                  label: item.budget,
                  value: item.id
                };
            }));
            setGroupsWithName(response.map((item) => {
                return {
                  ...item,
                  label: item.name,
                  value: item.id
                };
            }));
        }).finally(() => setIsLoading(false));
    }, []);

  
    return {groupsWithBudget, setGroupsWithBudget, groupsWithName, setGroupsWithName, isLoading};
  };