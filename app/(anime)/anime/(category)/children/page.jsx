import { Suspense } from "react";

import { getAnimeAnak } from "@/services/anime.service";
import { PaginationCustom } from "@/components/pagination";
import { CardAnime } from "@/components/card-anime";

export const metadata = {
  title: "Anime for Children",
};
const AnimeChildrenPage = async ({ searchParams }) => {
  let { page } = await searchParams;
  if (parseInt(page) < 1 || isNaN(page) || !page) {
    page = 1;
  }
  const animeAnak = await getAnimeAnak(24, page);
  const { data, pagination } = animeAnak;

  return (
    <main className="min-h-screen pt-5">
      <div className="grid grid-cols-1  gap-6  p-1 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((item, index) => (
          <CardAnime
            key={index}
            img={item.images.jpg.image_url}
            title={item.title}
            url={item.url}
            mal_id={item.mal_id}
            rank={item.rank}
            score={item.score}
            type={item.type}
          />
        ))}
      </div>
      <div className="my-10">
        <Suspense fallback={<></>}>
          <PaginationCustom
            currentPage={page}
            maxPagesToShow={5}
            totalPages={pagination.last_visible_page}
          />
        </Suspense>
      </div>
    </main>
  );
};

export default AnimeChildrenPage;
