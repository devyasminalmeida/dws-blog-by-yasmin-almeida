import { ReactNode } from "react";

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
};

export enum QueryKeys {
  categories = "categories",
}

export type CategoriesContextProviderProps = {
  children: ReactNode;
};

export type CategoryContextType = {
  data: Category[];
  isLoading: boolean;
  isError: boolean;
};
