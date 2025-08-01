"use client";

import { useRouter } from "@bprogress/next";
import { useQuery } from "@tanstack/react-query";
import { SearchCheck } from "lucide-react";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { TextTruncate } from "@/components/text-truncate";
import { ImageComponent } from "@/components/image";
import { useSearchModal } from "@/hooks/use-search-modal";
import { fetchSearchAnime } from "@/services/anime.service";
import { Button } from "@/components/ui/button";
import { useAddListModal } from "@/hooks/use-add-list-modal";

export const SearchList = ({ query }) => {
  const router = useRouter();

  const searchModal = useSearchModal();
  const { onOpen } = useAddListModal();
  const { isSignedIn } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: [query ? query : null],
    queryFn: () => fetchSearchAnime(query),
    enabled: !!query,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  if (error)
    return (
      <div className="flex h-[300px] items-center justify-center text-center">
        <h1>Something went wrong!</h1>
      </div>
    );
  if (isLoading) return <ListSkeleton />;
  return (
    <div className="flex flex-col gap-y-5">
      {!data && (
        <div className="flex h-[300px] items-center justify-center text-center">
          <h1>Masukkan kata kunci !</h1>
        </div>
      )}
      {data?.data.map((item, idx) => (
        <div key={idx} className="flex p-2 ">
          <div
            role="button"
            onClick={() => {
              router.push(`/anime/details/${item.mal_id}`, {
                scroll: false,
              });
              searchModal.onClose();
            }}
            className="flex-1"
          >
            <div className="flex  items-center gap-x-5">
              <ImageComponent
                alt={item.title}
                src={item.images.jpg.image_url}
                className="h-[32px] w-[24px]  rounded-sm sm:h-[64px] sm:w-[48px]"
              />

              <div className="flex flex-col">
                <TextTruncate
                  originalText={item.title}
                  maxLength={30}
                  className="text-sm font-semibold sm:text-lg"
                />
                <span className="text-xs sm:text-sm">
                  &#40;{item.type}&#41;
                </span>
                <span className="text-xs sm:text-sm">{item.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              onClick={() => {
                if (!isSignedIn) {
                  toast.error("Anda harus login terlebih dahulu !");
                  return;
                }
                onOpen(item.mal_id);
              }}
            >
              <MdFormatListBulletedAdd className="h-5 w-5 sm:h-10 sm:w-10" />
            </Button>
          </div>
        </div>
      ))}
      {query && (
        <div
          role="button"
          className="flex items-center gap-x-5 p-2 text-xs  sm:text-sm"
          onClick={() => {
            router.push(`/anime/results?q=${query}`);
            searchModal.onClose();
          }}
        >
          <SearchCheck className="h-8 w-6 sm:h-16 sm:w-12" />
          Lanjutkan Mencari: {query}
        </div>
      )}
    </div>
  );
};

const ListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex w-full items-center gap-x-5">
        <Skeleton className="h-16 w-12 " />
        <Skeleton className="h-16 w-96  " />
      </div>
      <div className="flex w-full items-center gap-x-5">
        <Skeleton className="h-16 w-12 " />
        <Skeleton className="h-16 w-96  " />
      </div>
      <div className="flex w-full items-center gap-x-5">
        <Skeleton className="h-16 w-12 " />
        <Skeleton className="h-16 w-96  " />
      </div>
      <div className="flex w-full items-center gap-x-5">
        <Skeleton className="h-16 w-12 " />
        <Skeleton className="h-16 w-96  " />
      </div>
    </div>
  );
};
