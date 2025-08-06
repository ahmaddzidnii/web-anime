"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React from "react";

import { CardSkeleton } from "@/components/skeleton";
import { CardAnime } from "@/components/card-anime";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { infiniteQueryAnimeExploreOptions } from "@/utils/query-options";

export const AnimeExplore = () => {
  return (
    <React.Suspense fallback={<SkeletonCaroselSwiper />}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
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
      <div className=" mt-5 grid grid-cols-1  gap-3  p-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5">
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
    <div className="grid grid-cols-1  gap-3  p-1 sm:grid-cols-2  lg:grid-cols-4 xl:grid-cols-5">
      {new Array(20).fill(0).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};
