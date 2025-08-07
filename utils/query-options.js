import { getExploreAnime } from "@/data/anime";
import { queryOptions } from "@tanstack/react-query";

export const infiniteQueryAnimeExploreOptions = queryOptions({
  queryKey: ["anime_explore"],
  queryFn: async ({ pageParam }) => {
    return await getExploreAnime(pageParam);
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
