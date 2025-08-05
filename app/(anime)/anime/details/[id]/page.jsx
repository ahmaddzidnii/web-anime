import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Calendar, Clock, Users, Trophy, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { tryCatch } from "@/utils/catchexception";
import { Skeleton } from "@/components/ui/skeleton";
import { getDetailAnimeById } from "@/services/anime.service";
import { AddListDetailPage } from "@/components/list/add-list";
import { Synopsis } from "./_components/synopsis";
import { AppError } from "@/errors/errors";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Detail anime",
};

const AnimeIdPage = async ({ params }) => {
  const { id } = await params;
  const [animeData, err] = await tryCatch(getDetailAnimeById(id));

  if (err) {
    console.log(err);
    const statusCode = err?.response?.status || 500;

    if (statusCode === 404) {
      return notFound();
    } else if (statusCode === 429) {
      throw new AppError("ToManyRequestsError", "Server Too Busy");
    } else if (statusCode === 500) {
      throw new AppError("InternalServerError", "Internal Server Error");
    }
  }

  if (!animeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Skeleton className="h-10 w-64" />
      </div>
    );
  }

  return (
    <div className="relative z-20 flex flex-col gap-8 md:flex-row">
      {/* Poster */}
      <div className="fixed top-[72px] mb-6 h-[500px] w-full flex-shrink-0 md:relative md:top-0 md:mb-0 md:h-[450px] md:w-[300px]">
        <Image
          src={animeData.images.jpg.large_image_url || "/placeholder.svg"}
          alt={animeData.title}
          fill
          className="mx-auto w-full rounded-lg object-cover shadow-2xl lg:mx-0"
        />
      </div>

      <div className="z-[100] mt-96 min-h-screen flex-1 space-y-6 rounded-xl bg-background px-4 py-8 md:mt-0 md:py-0">
        <div>
          <h1 className="mb-2 text-4xl font-bold lg:text-6xl">
            {animeData.title_english || animeData.title}
          </h1>
          <h2 className="mb-1 text-xl text-gray-800 dark:text-gray-300 lg:text-2xl">
            {animeData.title}
          </h2>
          <p className="text-lg text-gray-800 dark:text-gray-400">
            {animeData.title_japanese}
          </p>
        </div>

        {/* Score and Rank */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 fill-current text-yellow-400" />
            <span className="text-2xl font-bold text-yellow-400">
              {animeData.score}
            </span>
            <span className="text-gray-800 dark:text-gray-400">
              ({animeData.scored_by.toLocaleString()} votes)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-orange-400" />
            <span className="font-semibold text-orange-400">
              Rank #{animeData.rank}
            </span>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {animeData.genres.map((genre, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {genre.name}
            </Badge>
          ))}
          {animeData.demographics.map((demo, index) => (
            <Badge key={index} variant="outline" className="border-gray-600">
              {demo.name}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {animeData.trailer?.url && (
            <Link target="_blank" href={animeData.trailer.url}>
              <button className="flex items-center gap-2 rounded bg-gray-100 px-8 py-3 font-semibold text-black transition-colors hover:bg-gray-200 dark:bg-white">
                <Play className="h-5 w-5" />
                Watch Trailer
              </button>
            </Link>
          )}
          <AddListDetailPage />
        </div>

        {/* General Information - Integrated */}
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            <div className="rounded-lg border border-gray-800 bg-gray-700 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-100 dark:text-gray-300">
                  Aired
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {animeData.aired.string}
              </p>
              <p className="mt-1 text-xs capitalize text-blue-400">
                {animeData.season} {animeData.year}
              </p>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-700 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-gray-100 dark:text-gray-300">
                  Episodes
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {animeData.episodes} eps
              </p>
              <p className="mt-1 text-xs text-green-400">
                {animeData.duration}
              </p>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-700 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-gray-100 dark:text-gray-300">
                  Popularity
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                #{animeData.popularity}
              </p>
              <p className="mt-1 text-xs text-purple-400">
                {(animeData.members / 1000000).toFixed(1)}M members
              </p>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-700 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-gray-100 dark:text-gray-300">
                  Type
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {animeData.type}
              </p>
              <p className="mt-1 text-xs text-orange-400">{animeData.source}</p>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-700 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="mb-2 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-gray-300">
                  Studio
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {animeData.studios.map((studio) => studio.name).join(", ")}
              </p>
              <p className="mt-1 text-xs text-red-400">Animation</p>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-700 p-4 backdrop-blur-sm dark:bg-gray-900/50">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-400" />
                <span className="text-sm font-medium text-gray-300">
                  Status
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {animeData.status}
              </p>
              <p className="mt-1 text-xs text-cyan-400">{animeData.rating}</p>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div>
          <h3 className="mb-3 text-xl font-semibold">Synopsis</h3>
          <Synopsis synopsis={animeData.synopsis} />
        </div>
      </div>
    </div>
  );
};

export default AnimeIdPage;
