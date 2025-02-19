import { createContext, useMemo } from "react";

import { Post, PostsContextProviderProps } from "../types";
import usePostsQuery from "../services/usePostsQuery";
import { useSearchParams } from "react-router-dom";
import { FilterParams, filterPosts } from "../utils/filterPost";
import PostList from "../components/PostList";
import ErrorState from "../../../ui/atoms/ErrorState";

export const PostContext = createContext<Post[]>([]);

export const PostsContextProvider = ({
  children,
}: PostsContextProviderProps) => {
  const { data = [], isLoading, isError, refetch } = usePostsQuery();
  const [searchParams] = useSearchParams();
  const filteredPosts = useMemo(() => {
    const params = {
      authors: searchParams.getAll("authors"),
      categories: searchParams.getAll("categories"),
      sort: (searchParams.get("sort") || "asc") as FilterParams["sort"],
    };
    if (isLoading || isError) {
      return [];
    }

    return filterPosts(data, params);
  }, [isLoading, isError, data, searchParams]);

  if (isLoading) {
    return <PostList.Skeleton />;
  }

  if (isError) {
    return <ErrorState onClick={refetch} />;
  }

  return (
    <PostContext.Provider value={filteredPosts}>
      {children}
    </PostContext.Provider>
  );
};
