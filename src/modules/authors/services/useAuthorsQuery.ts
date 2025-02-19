import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import api from "../../../api/api";
import { Author, QueryKeys } from "../types";

const useAuthorsQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.authors],
    queryFn: async () => {
      const { data }: AxiosResponse<Author[]> = await api.get("/authors");
      return data;
    },
  });
};

export default useAuthorsQuery;
