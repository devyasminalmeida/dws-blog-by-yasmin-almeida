import { Post } from "../types";

export type FilterParams = {
  categories: string[];
  authors: string[];
  sort: "asc" | "desc";
};

export const filterPosts = (posts: Post[], params: FilterParams): Post[] => {
  const result = posts.filter((post) => {
    const matchesCategory =
      !params.categories.length ||
      params.categories.some((categoryId) =>
        post.categories.some((postCategory) => postCategory.id === categoryId)
      );

    const matchesAuthor =
      !params.authors.length || params.authors.includes(post.author.id);

    return matchesCategory && matchesAuthor;
  });

  return result.sort((a, b) => {
    if (params.sort === "asc") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};
