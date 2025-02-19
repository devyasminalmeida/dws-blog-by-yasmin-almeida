import { ReactNode } from "react";
import { Author } from "../authors/types";
import { Category } from "../categories/types";

export type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  author: Author;
};

export enum QueryKeys {
  posts = "posts",
  post = "post",
}

export type PostsContextProviderProps = {
  children: ReactNode;
};

export type PostContextType = {
  data: Post | undefined;
  latestsPosts: Post[];
  isLoading: boolean;
  isError: boolean;
};
