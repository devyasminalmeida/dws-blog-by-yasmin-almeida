import { createContext } from "react";

import { AuthorsContextProviderProps, AuthorsContextType } from "../types";
import useAuthorsQuery from "../services/useAuthorsQuery";

export const AuthorsContext = createContext<AuthorsContextType>({
  data: [],
  isLoading: false,
  isError: false,
});

export const AuthorsContextProvider = ({
  children,
}: AuthorsContextProviderProps) => {
  const { data = [], isLoading, isError } = useAuthorsQuery();
  return (
    <AuthorsContext.Provider
      value={{
        data,
        isLoading,
        isError,
      }}
    >
      {children}
    </AuthorsContext.Provider>
  );
};
