"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import { CardSkeleton } from "@/components/skeleton";
import { CardAnime } from "@/components/card-anime";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { infiniteQueryAnimeExploreOptions } from "@/utils/query-options";
import { parseErrorCode } from "@/app/(root)/_components/anime-popular-list-error";

const AnimeExploreError = ({ error, resetErrorBoundary }) => {
  console.error(error.message);
  return (
    <div className=" w-full rounded-lg bg-[#1f1f1f] p-8 text-center shadow-lg sm:p-12">
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="mb-3 text-3xl font-bold text-white">
        Pardon the Interruption
      </h1>
      <p className="mb-8 text-lg text-gray-400">
        We're having trouble loading this content right now. Please check your
        connection or try again in a moment.
      </p>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-white px-8 py-3 font-bold text-black transition-colors duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1f1f1f]"
        >
          Try Again
        </button>
        <span className="text-sm text-gray-500">
          Error Code: {parseErrorCode(error)}
        </span>
      </div>
    </div>
  );
};
export const AnimeExplore = () => {
  return (
    <React.Suspense fallback={<SkeletonCaroselSwiper />}>
      <ErrorBoundary FallbackComponent={AnimeExploreError}>
        <AnimeExploreSuspense />
      </ErrorBoundary>
    </React.Suspense>
  );
};
export const AnimeExploreSuspense = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(infiniteQueryAnimeExploreOptions);

  const element = data?.pages.flatMap((group) =>
    group.data.map((item) => (
      <CardAnime
        rank={item.rank}
        img={item.images.jpg.image_url}
        title={item.title}
        mal_id={item.mal_id}
        score={item.score}
        type={item.type}
        key={item.mal_id}
      />
    )),
  );

  return (
    <section>
      <div className="grid-anime-custom mt-5  grid  grid-cols-2 gap-3 p-1 ">
        {element}
      </div>
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  );
};

export const SkeletonCaroselSwiper = () => {
  return (
    <div className="grid-anime-custom  grid  gap-3 p-1">
      {new Array(20).fill(0).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};
