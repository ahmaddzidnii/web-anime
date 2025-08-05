"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const HorizontalScrollCarousel = ({ animes }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fungsi untuk mengecek apakah bisa scroll ke kiri/kanan
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      // Memberi sedikit toleransi untuk kalkulasi browser yang tidak presisi
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const performScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      // 1. Definisikan lebar item + margin (196px dari w-[196px] + 20px dari mr-5)
      const itemWidth = 196 + 20;

      // 2. Hitung berapa banyak item yang muat di layar
      const visibleItems = Math.floor(container.clientWidth / itemWidth);

      // 3. Pastikan kita scroll setidaknya satu item
      const itemsToScroll = Math.max(1, visibleItems);

      // 4. Tentukan jarak scroll total
      const scrollAmount = itemsToScroll * itemWidth;

      container.scrollBy({
        left: scrollAmount * direction, // direction akan menjadi 1 atau -1
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => performScroll(-1); // Scroll ke kiri
  const scrollRight = () => performScroll(1); // Scroll ke kanan

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollability();

    const handleInteraction = () => setTimeout(checkScrollability, 150);

    container.addEventListener("scroll", handleInteraction);
    window.addEventListener("resize", handleInteraction);

    return () => {
      container.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("resize", handleInteraction);
    };
  }, []);

  return (
    <div className="relative flex h-max select-none items-center">
      <ul
        ref={scrollContainerRef}
        className="scrollbar-hide flex overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {animes.map((anime, index) => (
          <Link
            prefetch
            key={anime?.mal_id}
            href={`/anime/details/${anime?.mal_id}`}
          >
            <div className="relative mr-5 aspect-[2/3] w-[196px] flex-shrink-0 overflow-hidden rounded-md">
              {/* Skeleton as background */}
              <Skeleton className="absolute inset-0 h-full w-full" />

              {/* Anime image overlay */}
              <li
                title={anime?.title}
                data-content={index + 1}
                style={{
                  backgroundImage: `url(${anime?.images.jpg.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                }}
                className="relative z-10 h-full w-full text-background transition-transform duration-300 ease-in-out after:absolute after:-bottom-[32px] after:left-1 after:z-[100] after:text-[100px] after:font-semibold after:content-[attr(data-content)] after:[-webkit-text-stroke:1px_black] hover:scale-105 dark:after:[-webkit-text-stroke:1px_white]"
              />
            </div>
          </Link>
        ))}
      </ul>

      <AnimatePresence>
        {/* Left Navigation Button */}
        {canScrollLeft && (
          <motion.div
            className="absolute left-0 top-0 flex h-full w-12 items-center justify-center bg-gradient-to-r from-background to-transparent"
            key="scroll-left"
            style={{ zIndex: 20 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={scrollLeft}
              className="rounded-full p-2 hover:bg-white/20"
              aria-label="Scroll Left"
            >
              <FaChevronLeft className="size-6 text-foreground" />
            </button>
          </motion.div>
        )}

        {/* Right Navigation Button */}
        {canScrollRight && (
          <motion.div
            key="scroll-right"
            style={{ zIndex: 20 }}
            className="absolute right-0 top-0 flex h-full w-12 items-center justify-center bg-gradient-to-l from-background to-transparent"
            aria-label="scroll-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <button
              onClick={scrollRight}
              className="rounded-full p-2 hover:bg-white/20"
              aria-label="Scroll Right"
            >
              <FaChevronRight className="size-6 text-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorizontalScrollCarousel;
