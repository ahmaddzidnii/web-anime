import { Suspense } from "react";

import { getAnimeTop } from "@/services/anime.service";
import { PaginationCustom } from "@/components/pagination";
import { CardAnime } from "@/components/card-anime";

export const metadata = {
  title: "Top Anime",
};

const TopAnimePage = async ({ searchParams }) => {
  let { page } = await searchParams;
  if (parseInt(page) < 1 || isNaN(page) || !page) {
    page = 1;
  }
  const animePopular = await getAnimeTop({
    resource: "/top/anime",
    limit: 24,
    query: `&page=${page}`,
  });

  const { data, pagination } = animePopular;
  return (
    <div className="min-h-screen pt-5">
      <h1 className="mb-5 text-xl font-bold tracking-wide sm:text-2xl  md:text-3xl lg:text-4xl">
        Top Anime
      </h1>
      <div className="grid grid-cols-1  gap-6  p-1 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((item, index) => (
          <CardAnime
            key={index}
            rank={item.rank}
            img={item.images.jpg.large_image_url}
            mal_id={item.mal_id}
            title={item.title}
            score={item.score}
            type={item.type}
          />
        ))}
      </div>
      <div className="my-10">
        <Suspense fallback={null}>
          <PaginationCustom
            currentPage={page}
            maxPagesToShow={5}
            totalPages={pagination.last_visible_page}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default TopAnimePage;
