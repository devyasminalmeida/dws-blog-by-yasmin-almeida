import { createContext } from "react";

import { PostContextType } from "../types";
import usePostQuery from "../services/usePostQuery";
import { useParams } from "react-router-dom";
import PostContent from "../components/PostContent";
import ErrorState from "../../../ui/atoms/ErrorState";
import usePostsQuery from "../services/usePostsQuery";

export const PostContext = createContext<PostContextType>({
  data: undefined,
  latestsPosts: [],
  isLoading: false,
  isError: false,
});

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = usePostQuery(id as string);
  const { data: posts = [] } = usePostsQuery();

  const latestsPosts = posts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  if (isLoading) {
    return <PostContent.Skeleton />;
  }

  if (isError) {
    return <ErrorState onClick={refetch} />;
  }

  if (!data && !isLoading && !isError) {
    return <p>not found</p>;
  }
  return (
    <PostContext.Provider
      value={{
        data,
        latestsPosts,
        isLoading,
        isError,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
