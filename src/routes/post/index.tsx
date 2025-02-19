import PostContent from "../../modules/posts/components/PostContent";
import { PostContextProvider } from "../../modules/posts/context/post";

export default function Post() {
  return (
    <PostContextProvider>
      <PostContent />
    </PostContextProvider>
  );
}
