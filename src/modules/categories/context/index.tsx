import { createContext } from "react";

import { CategoriesContextProviderProps, CategoryContextType } from "../types";
import useCategoriesQuery from "../services/useCategoriesQuery";

export const CategoryContext = createContext<CategoryContextType>({
  data: [],
  isLoading: false,
  isError: false,
});

export const CategoriesContextProvider = ({
  children,
}: CategoriesContextProviderProps) => {
  const { data = [], isLoading, isError } = useCategoriesQuery();
  return (
    <CategoryContext.Provider
      value={{
        data,
        isLoading,
        isError,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
