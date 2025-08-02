"use client";
import { FaList } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export const IconListAnime = () => {
  const auth = useAuth();

  if (!auth.isSignedIn) {
    return null;
  }

  return (
    <nav>
      <Link aria-label="List" href="/list" className="relative">
        <FaList className="h-[1.2rem] w-[1.2rem] md:h-6 md:w-6" />
      </Link>
    </nav>
  );
};
