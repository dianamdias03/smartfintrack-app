import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../core/service";
import { Category } from "../model/category";

export const useCategories = (userLoginId: number | undefined) => {
    const { getCategories } = useContext(ServiceContext);
    const [categories, setCategories] = useState<Category[]>([]);
  
    useEffect(() => {
        getCategories(userLoginId).then((response) => {
            setCategories(response.map((item) => {
                return {
                  ...item,
                  label: item.name,
                  value: item.id
                };
            }));
        });
    }, []);

  
    return {categories, setCategories};
  };