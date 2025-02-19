import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Category, QueryKeys } from "../types";
import api from "../../../api/api";

const useCategoriesQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.categories],
    queryFn: async () => {
      const { data }: AxiosResponse<Category[]> = await api.get("/categories");
      return data;
    },
  });
};

export default useCategoriesQuery;
