import { getQueryClient } from "@/utils/get-query-client";
import { AnimeExplore } from "./_components/anime-explore";
import { infiniteQueryAnimeExploreOptions } from "@/utils/query-options";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const metadata = {
  title: "Anime",
};
export const dynamic = "force-dynamic";

const AnimePage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(infiniteQueryAnimeExploreOptions);
  return (
    <div className="min-h-screen w-full px-2  2xl:px-0">
      <h1 className="my-5 text-3xl  font-bold tracking-wide">Explore Anime</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AnimeExplore />
      </HydrationBoundary>
      <AnimeExplore />
    </div>
  );
};

export default AnimePage;
