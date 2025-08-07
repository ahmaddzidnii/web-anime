import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Info, Play } from "lucide-react";

import { AppError } from "@/errors/errors";
import { Button } from "@/components/ui/button";
import { getPopularAnime, getPopularAnimeForChildren } from "@/data/anime";
import { tryCatch } from "@/utils/catchexception";
import { Skeleton } from "@/components/ui/skeleton";
import { HorizontalScrollCarousel } from "./_components/HorizontalCarousel";
import { AnimePopularListError } from "./_components/anime-popular-list-error";

export const metadata = {
  title: "Beranda",
};

const AnimePopularList = async () => {
  const [animePopular, err] = await tryCatch(
    getPopularAnime({
      limit: 10,
    }),
  );

  if (err) {
    console.error(err);
    throw new AppError("InternalServerError", "Failed to fetch popular anime");
  }

  return <HorizontalScrollCarousel animes={animePopular} />;
};

const AnimePopularForChildrenList = async () => {
  const [animePopular, err] = await tryCatch(
    getPopularAnimeForChildren({
      limit: 10,
    }),
  );

  if (err) {
    console.log(err);
    throw new AppError("InternalServerError", "Failed to fetch popular anime");
  }

  return <HorizontalScrollCarousel animes={animePopular} />;
};

const AnimePopularListSkeleton = () => {
  return (
    <div className="flex overflow-hidden">
      {Array.from({ length: 7 }).map((_, idx) => (
        <div
          key={idx}
          className="relative mr-5 aspect-[2/3] w-[196px] flex-shrink-0 overflow-hidden rounded-md"
        >
          <Skeleton className="absolute z-[1] h-full w-full" />
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <main className="mx-auto min-h-screen 2xl:max-w-screen-2xl">
      <NetflixHero />

      <section className="container mt-5 bg-background">
        <h2 className="text-3xl font-bold">Anime Populer</h2>
        <div className="mt-5 ">
          <Suspense fallback={<AnimePopularListSkeleton />}>
            <ErrorBoundary FallbackComponent={AnimePopularListError}>
              <AnimePopularList />
            </ErrorBoundary>
          </Suspense>
        </div>
      </section>

      <section className="container mt-5 bg-background">
        <h2 className="text-3xl font-bold">Anime Anak Populer</h2>
        <div className="mt-5 ">
          <Suspense fallback={<AnimePopularListSkeleton />}>
            <ErrorBoundary FallbackComponent={AnimePopularListError}>
              <AnimePopularForChildrenList />
            </ErrorBoundary>
          </Suspense>
        </div>
      </section>

      <section className="container my-16 flex justify-center bg-background">
        <Button className="w-full md:w-max" asChild>
          <Link href="/anime">Explore All Anime</Link>
        </Button>
      </section>
    </main>
  );
}

function NetflixHero() {
  return (
    <div className=" relative aspect-video overflow-hidden">
      {/* Skeleton Layer (akan tertutup oleh background image saat loaded) */}
      <div className="absolute inset-0 z-0">
        <Skeleton className="h-full w-full" />

        {/* Skeleton Content Mobile*/}
        <div className="absolute inset-0 z-10 flex items-center md:hidden">
          <div className="absolute bottom-0 left-1/2 right-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="w-full max-w-xs">
              {/* Title Skeleton */}
              <Skeleton className="mb-3 h-8 w-48 sm:mb-4 sm:h-10" />

              <div className="flex items-center gap-4">
                {/* Button Skeleton */}
                <Skeleton className="h-10 w-24 rounded-md" />

                {/* Info Skeleton */}
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-6 w-8 rounded" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton Content Desktop */}
        <div className=" absolute inset-0 z-10 hidden items-center md:flex">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="max-w-full sm:max-w-lg md:ml-auto lg:max-w-xl">
              {/* Title Skeleton */}
              <Skeleton className="mb-3 h-8 w-80 sm:mb-4 sm:h-10 md:h-12 xl:h-14" />

              {/* Subtitle Skeleton */}
              <div className="mb-6 space-y-2 sm:mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Buttons Skeleton */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Skeleton className="h-12 w-32 rounded-md sm:h-16 sm:w-40" />
                <Skeleton className="h-12 w-32 rounded-md sm:h-16 sm:w-40" />
              </div>

              {/* Additional Info Skeleton */}
              <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-4">
                <Skeleton className="h-6 w-8 rounded" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image Layer dengan delay untuk loading effect */}
      <div
        className=" absolute inset-0 z-20"
        style={{
          backgroundImage: "url(/walpaper.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-30">
        {/* Content Mobile */}
        <div className="flex h-full items-center md:hidden">
          <div className="absolute bottom-0 left-1/2 right-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="animate-fade-in">
              {/* Title */}
              <h1 className="mb-3 text-2xl font-bold leading-4 text-white sm:mb-4 sm:text-3xl md:text-4xl xl:text-5xl">
                Kimi No Na Wa
              </h1>

              <div className="flex items-center gap-4">
                {/* Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link href="/anime">
                    {" "}
                    <button className="flex transform items-center justify-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200">
                      <Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
                      Explore
                    </button>
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300 sm:gap-4 sm:text-sm">
                  <span className="rounded bg-red-600 px-2 py-1 font-semibold text-white">
                    HD
                  </span>
                  <span>2016</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Drama</span>
                  <span className="hidden sm:inline">•</span>
                  <span>1 hr 46 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Desktop */}
        <div className="hidden h-full items-center md:flex">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="max-w-full sm:max-w-lg md:ml-auto lg:max-w-xl">
              <div className="animate-fade-in">
                {/* Title */}
                <h1 className="mb-3 text-2xl font-bold leading-4 text-white sm:mb-4 sm:text-3xl md:text-4xl xl:text-5xl">
                  Dua jiwa. Satu takdir.
                </h1>

                {/* Subtitle */}
                <p className="mb-6 text-sm font-light leading-relaxed text-gray-200 sm:mb-8 sm:text-base md:text-lg lg:text-xl">
                  Mitsuha dan Taki hidup di dunia yang berbeda, hingga suatu
                  pagi mereka terbangun di tubuh satu sama lain. Tanpa tahu
                  mengapa, mereka terhubung oleh kekuatan misterius yang
                  melampaui ruang dan waktu.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link href="/anime">
                    <button className="flex transform items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200 sm:px-8 sm:py-4 sm:text-lg">
                      <Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
                      Explore
                    </button>
                  </Link>

                  <button className="flex items-center justify-center gap-2 rounded-md bg-gray-600/70 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-gray-600/90 sm:px-8 sm:py-4 sm:text-lg">
                    <Info className="h-5 w-5 sm:h-6 sm:w-6" />
                    More Info
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-gray-300 sm:mt-8 sm:gap-4 sm:text-sm">
                  <span className="rounded bg-red-600 px-2 py-1 font-semibold text-white">
                    HD
                  </span>
                  <span>2016</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Drama</span>
                  <span className="hidden sm:inline">•</span>
                  <span>1 hr 46 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
