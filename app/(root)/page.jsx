import { Info, Play } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Beranda",
};
export default function Home() {
  return (
    <main className="mx-auto min-h-screen 2xl:max-w-screen-2xl">
      <NetflixHero />
    </main>
  );
}

function NetflixHero() {
  return (
    <div className="relative aspect-video overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/walpaper.png"
          alt="Hero Background"
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 hidden h-full items-center md:flex">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="max-w-full sm:max-w-lg md:ml-auto lg:max-w-xl">
            {/* Title */}
            <h1 className="mb-3 text-2xl font-bold leading-4 text-white sm:mb-4 sm:text-3xl md:text-4xl  xl:text-5xl">
              Dua jiwa. Satu takdir.
            </h1>

            {/* Subtitle */}
            <p className="mb-6 text-sm font-light leading-relaxed text-gray-200 sm:mb-8 sm:text-base md:text-lg lg:text-xl">
              Mitsuha dan Taki hidup di dunia yang berbeda, hingga suatu pagi
              mereka terbangun di tubuh satu sama lain. Tanpa tahu mengapa,
              mereka terhubung oleh kekuatan misterius yang melampaui ruang dan
              waktu.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/anime">
                <button className="flex transform items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200 sm:px-8 sm:py-4 sm:text-lg">
                  <Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
                  Explore
                </button>
              </Link>
              <Link href="/anime/details/32281">
                <button className="flex items-center justify-center gap-2 rounded-md bg-gray-600/70 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-gray-600/90 sm:px-8 sm:py-4 sm:text-lg">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6" />
                  More Info
                </button>
              </Link>
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

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}
