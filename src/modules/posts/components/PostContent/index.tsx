import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { useContext } from "react";
import { PostContext } from "../../context/post";
import Button from "../../../../ui/atoms/Button";
import ArrowLeft from "../../../../ui/atoms/Icons/ArrowLeft";
import { formatDate } from "../../../../util/date";
import Skeleton from "../../../../ui/atoms/Skeleton";
import PostItem from "../PostItem";

export default function PostContent() {
  const { data: post, latestsPosts } = useContext(PostContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  if (!post) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button onClick={handleNavigate} variant="ghost">
          <ArrowLeft />
          <span>Back</span>
        </Button>
      </div>
      <div className={styles.content}>
        <h1>{post.title}</h1>

        <div className={styles.avatar}>
          <img src={post.author.profilePicture} alt={post.author.name} />
          <div className={styles.author}>
            <span>
              Written by: <b>{post.author.name}</b>
            </span>
            <span>
              <time dateTime={formatDate(post.createdAt)}>
                {formatDate(post.createdAt)}
              </time>
            </span>
          </div>
        </div>

        <img
          className={styles.image}
          src={post.thumbnail_url}
          alt={post.title}
        />
        <p>{post.content}</p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.content}>
        <h2>Latest Posts</h2>
        <div className={styles.latestPostsList}>
          {latestsPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

PostContent.Skeleton = function PostContentSkeleton() {
  return (
    <div className={styles.content}>
      <Skeleton width="100%" height="250px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="30px" />
    </div>
  );
};
