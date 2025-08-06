import { axiosInstance } from "@/lib/axios/axiosInstance";
import { queryOptions } from "@tanstack/react-query";

export const infiniteQueryAnimeExploreOptions = queryOptions({
  queryKey: ["anime_explore"],
  queryFn: async ({ pageParam }) => {
    const response = await axiosInstance.get("/top/anime", {
      params: {
        page: pageParam,
        limit: 20,
        sfw: true,
        filter: "bypopularity",
      },
    });

    return response.data;
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    if (lastPage?.pagination?.has_next_page) {
      return allPages.length + 1;
    } else {
      return undefined;
    }
  },
  refetchOnWindowFocus: false,
});
