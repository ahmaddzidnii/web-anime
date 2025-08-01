"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bars } from "react-loader-spinner";
import { FaStar } from "react-icons/fa";
import { GiPeriscope } from "react-icons/gi";

import { useFetchList } from "@/hooks/feature-list/use-query-list";
import { FilterListAnime } from "./filter-list";
import { ImageComponent } from "../image";
import { EditList, EditListMobile } from "./edit-list";
import { Separator } from "@/components/ui/separator";
import { ProgressComponent } from "@/components/progress-component";
import { Badge } from "@/components/ui/badge";

export const ListAnime = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "ALL";
  const orderBy = searchParams.get("orderBy");

  const [isMounted, setIsMounted] = useState(false);

  const { data, isLoading, isError } = useFetchList({
    status: status,
    orderBy: orderBy,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FilterListAnime />

      {isLoading && (
        <div className="flex h-[60vh] items-center justify-center">
          <Bars
            height="80"
            width="80"
            color="#facc15"
            ariaLabel="bars-loading"
          />
        </div>
      )}

      {isError && (
        <div className="flex h-[60vh] items-center justify-center">
          <h1>Something went wrong!</h1>
        </div>
      )}

      {data && (
        <>
          {data.lists?.length == 0 && (
            <div className="flex h-[60vh] items-center justify-center gap-x-3">
              <GiPeriscope className="h-10 w-10 sm:h-20 sm:w-20" />
              <h1 className="text-center text-lg font-bold sm:text-xl">
                Tidak ada data anime!
              </h1>
            </div>
          )}
          <div className="h-full">
            {data.lists?.map((item) => {
              const progress = Math.ceil(
                (item.watched_episode / item.total_episode) * 100,
              );
              return (
                <div key={item.id}>
                  <Separator className="my-2" />
                  <div className="relative flex gap-x-5">
                    <div>
                      <ImageComponent
                        src={item.anime_image}
                        alt={item.anime_title}
                        className="h-[130px] w-[80px] sm:h-[150px] sm:w-[100px] md:h-[200px] md:w-[150px]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center space-y-2 ">
                      <EditListMobile data={item} />
                      <Link
                        href={`/anime/details/${item.anime_id}`}
                        className="text-sm font-bold sm:text-lg md:text-xl"
                      >
                        {item.anime_title}
                      </Link>
                      <div className="flex items-center space-x-3">
                        <p className="text-[10px] sm:text-sm">{item.type}</p>
                        <Badge
                          variant="outline"
                          className="text-[10px] sm:text-sm"
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <ProgressComponent
                        status={item.status}
                        value={progress}
                      />
                      <div className="flex justify-between">
                        <p className="rounded-[1px] text-[10px] sm:text-sm">
                          {item.score != 0 && (
                            <span className="flex items-center gap-x-1">
                              <FaStar className="text-yellow-500" />{" "}
                              {item.score}
                            </span>
                          )}
                        </p>
                        <p className="rounded-[1px] text-[10px] sm:text-sm">
                          {item.watched_episode}/{item.total_episode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden w-[40px] md:block">
                      <div className="flex h-full items-center justify-center space-x-2">
                        <EditList data={item} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
