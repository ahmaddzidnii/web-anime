import Image from "next/image";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa6";
import { BsBarChart } from "react-icons/bs";

import { TextTruncate } from "./text-truncate";
import { AddList } from "./list/add-list";
import { Skeleton } from "./ui/skeleton";
import { parseBoolean } from "@/utils/common";

const isPrefetchEnabled = parseBoolean(process.env.NEXT_PUBLIC_PREFETCH_LINK);

export const CardAnime = ({
  mal_id,
  title,
  img,
  score,
  type,
  rank,
  refElement,
}) => {
  return (
    <article ref={refElement}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-b-lg rounded-t-lg border ">
        <Link href={`/anime/details/${mal_id}`} prefetch={isPrefetchEnabled}>
          <div className="relative h-[400px] w-full ">
            <Skeleton className="absolute h-full w-full object-cover" />
            <Image
              quality={100}
              src={img}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <div className=" px-2 pb-2">
          <div className="w-full">
            <Link
              href={`/anime/details/${mal_id}`}
              prefetch={isPrefetchEnabled}
            >
              <div className="flex justify-between">
                <TextTruncate
                  className="text-sm font-semibold"
                  originalText={title}
                  maxLength={20}
                />
                <span className="text-xs font-bold text-muted-foreground">
                  {type}
                </span>
              </div>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between">
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
    </article>
  );
};
