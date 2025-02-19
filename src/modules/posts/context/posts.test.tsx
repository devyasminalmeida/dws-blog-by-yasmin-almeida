import { ReactNode, useContext } from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostsContextProvider, PostContext } from "./posts";

vi.mock("../../src/modules/posts/services/usePostsQuery", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("react-router-dom", () => ({
  useSearchParams: () => [new URLSearchParams()],
}));
vi.mock("../components/PostList", () => {
  const MockPostList = ({ children }: { children?: ReactNode }) => (
    <div data-testid="postlist">{children}</div>
  );
  MockPostList.Skeleton = () => <div data-testid="skeleton">Loading...</div>;
  return {
    __esModule: true,
    default: MockPostList,
  };
});

vi.mock("../../../components/atoms/ErrorState", () => ({
  default: () => <div data-testid="error">Error</div>,
}));

const queryClient = new QueryClient();
const mockedUsePostsQuery = vi.fn();

const renderWithProvider = (children: ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <PostsContextProvider>{children}</PostsContextProvider>
    </QueryClientProvider>
  );
};

const TestConsumer = () => {
  const posts = useContext(PostContext);
  return (
    <div data-testid="posts-output">
      {posts.length ? "Posts found" : "No posts"}
    </div>
  );
};

describe("PostsContextProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state initially", () => {
    mockedUsePostsQuery.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    renderWithProvider(<TestConsumer />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByText("Posts found")).not.toBeInTheDocument();
  });

  it("should show filtered posts when data is available", async () => {
    mockedUsePostsQuery.mockReturnValue({
      data: [
        {
          id: "1",
          title: "Post 1",
          content: "Content 1",
          thumbnail_url: "",
          author: "Author 1",
          category: "Category 1",
        },
      ],
      isLoading: false,
      isError: false,
    });

    renderWithProvider(<TestConsumer />);

    expect(await screen.findByText("Posts found")).toBeInTheDocument();
  });
});
