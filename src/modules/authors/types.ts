import { ReactNode } from "react";

export type Author = {
  id: string;
  name: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
};

export enum QueryKeys {
  authors = "authors",
}

export type AuthorsContextProviderProps = {
  children: ReactNode;
};

export type AuthorsContextType = {
  data: Author[];
  isLoading: boolean;
  isError: boolean;
};
