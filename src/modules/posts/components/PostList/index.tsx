import { useContext } from "react";

import { PostContext, PostsContextProvider } from "../../context/posts";
import PostItem from "../PostItem";
import styles from "./styles.module.scss";

export default function PostList() {
  return (
    <PostsContextProvider>
      <Posts />
    </PostsContextProvider>
  );
}

function Posts() {
  const posts = useContext(PostContext);

  return posts.length ? (
    <div className={styles.container}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  ) : (
    <div>No posts found</div>
  );
}

PostList.Skeleton = function PostListSkeleton() {
  return (
    <div className={styles.container}>
      {[...new Array(5)].map((_, index) => (
        <PostItem.Skeleton key={index} />
      ))}
    </div>
  );
};
