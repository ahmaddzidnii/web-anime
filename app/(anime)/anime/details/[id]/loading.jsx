import { Skeleton } from "@/components/ui/skeleton";

const AnimeIdPageLoading = async () => {
  return (
    <div className="relative z-20 flex flex-col gap-8 md:flex-row">
      {/* Poster */}
      <Skeleton className="relative mb-6 h-[650px] w-full flex-shrink-0 md:mb-0 md:h-[450px] md:w-[300px]" />
      <div className="flex-1 space-y-6">
        <div>
          <Skeleton className="mb-1 h-10 w-[412px]" />
          <Skeleton className="mb-1 h-8 w-[300px]" />
          <Skeleton className="h-8 w-[200px] " />
        </div>

        {/* Score and Rank */}
        <Skeleton className="h-8 w-[350px] " />

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-[100px] rounded-full " />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-12 w-[250px] " />
          <Skeleton className="h-12 w-[200px] " />
        </div>

        {/* General Information - Integrated */}
        <div className="max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-24 w-full rounded-lg " />
            ))}
          </div>
        </div>

        {/* Synopsis */}
        <div>
          <Skeleton className="mb-3 h-8 w-[100px]" />
          <Skeleton className="h-56 w-full " />
        </div>
      </div>
    </div>
  );
};

export default AnimeIdPageLoading;
