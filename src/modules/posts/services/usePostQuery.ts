import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "../../../api/api";
import { Post, QueryKeys } from "../types";

const usePostQuery = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.post, id],
    queryFn: async () => {
      const { data }: AxiosResponse<Post> = await api.get(`/posts/${id}`);
      return data;
    },
    staleTime: Infinity,
  });
};

export default usePostQuery;
