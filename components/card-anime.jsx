import Link from "next/link";
import { FaRegStar } from "react-icons/fa6";
import { BsBarChart } from "react-icons/bs";

import { AddList } from "./list/add-list";
import { Skeleton } from "./ui/skeleton";
import { parseBoolean } from "@/utils/common";

const isPrefetchEnabled = parseBoolean(process.env.NEXT_PUBLIC_PREFETCH_LINK);

export const CardAnime = ({ mal_id, title, img, score, type, rank }) => {
  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden rounded-b-lg rounded-t-lg border ">
      <Link href={`/anime/details/${mal_id}`} prefetch={isPrefetchEnabled}>
        <div className="relative aspect-[2/3]  flex-shrink-0 overflow-hidden rounded-t-md">
          {/* Skeleton as background */}
          <Skeleton className="absolute inset-0 h-full w-full" />

          {/* Anime image overlay */}
          <div
            title={title}
            role="img"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
            className="relative z-10 h-full w-full text-background transition-transform duration-300 ease-in-out  hover:scale-105 "
          />
        </div>
      </Link>
      <div className=" px-2 pb-2">
        <div className="w-full">
          <Link href={`/anime/details/${mal_id}`} prefetch={isPrefetchEnabled}>
            <div className="flex justify-between">
              <p className="line-clamp-1 text-xs font-semibold">{title}</p>

              <span className="text-xs font-bold text-muted-foreground">
                {type}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex w-full items-center justify-between text-xs font-semibold">
          <div className="flex w-full items-center gap-x-2 font-semibold">
            {rank && (
              <div className="flex items-center gap-x-1">
                <BsBarChart className="h-5 w-5 " />
                {rank}
              </div>
            )}
            {score && (
              <div className="flex items-center gap-x-1  text-orange-400">
                <FaRegStar className="h-5 w-5 " />
                {score}
              </div>
            )}
          </div>
          <AddList data={mal_id} />
        </div>
      </div>
    </div>
  );
};
