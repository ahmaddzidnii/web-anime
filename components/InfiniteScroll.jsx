import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SkeletonCaroselSwiper } from "@/app/(anime)/anime/_components/anime-explore";

export const InfiniteScroll = ({
  isManual = false,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  });

  const isFetchingRef = useRef(false);

  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage;
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!isManual && isIntersecting && hasNextPage && !isFetchingRef.current) {
      isFetchingRef.current = true;
      fetchNextPage().finally(() => {
        isFetchingRef.current = false;
      });
    }
  }, [isManual, isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col ">
      {/* ===============================================================
        Perbaikan Kunci: Posisikan indikator loading SEBELUM target ref.
        Ini memastikan pengalaman pengguna yang mulus dan mencegah layout shift
        yang dapat mengganggu Intersection Observer.
        ===============================================================
      */}
      {isFetchingNextPage && <SkeletonCaroselSwiper />}

      {/* Target div untuk Intersection Observer. Diletakkan di paling akhir. */}
      <div ref={targetRef} aria-hidden="true" />

      {hasNextPage
        ? isManual && (
            <Button
              className="w-max"
              variant="secondary"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          )
        : // Pesan ini hanya akan muncul jika sudah tidak ada data lagi DAN
          // proses fetching juga tidak sedang berjalan, agar tidak tumpang tindih
          // dengan skeleton loading.
          !isFetchingNextPage && (
            <p className="text-center text-sm text-muted-foreground">
              You have reached the end of the list.
            </p>
          )}
    </div>
  );
};
