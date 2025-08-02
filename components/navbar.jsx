import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { Suspense } from "react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { ProfileUser } from "@/components/auth/profile-user";
import { ButtonModalSearch } from "@/components/modal/modal-search/button-modal-search";
import { IconListAnime } from "@/components/icon-list-anime";

export const Navbar = () => {
  return (
    <header className="max-w-screen sticky top-0 z-50 w-full border-b  bg-background  py-3.5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-[#1f1f1f] dark:supports-[backdrop-filter]:bg-[#1f1f1f]/60">
      <div className="mx-auto flex max-w-[1400px] items-center">
        <Link href="/anime">
          <div className="flex items-center">
            <Image
              className="dark:hidden"
              src="/logo.svg"
              height="40"
              width="40"
              alt="logo"
            />
            <Image
              className="hidden dark:block"
              src="/logo-dark.svg"
              height="40"
              width="40"
              alt="logo"
            />
            <p className={cn("hidden font-semibold sm:block")}>Animefy</p>
          </div>
        </Link>
        <div className="ml-4 flex flex-1 items-center justify-end gap-x-2 md:ml-0 md:gap-x-5">
          <nav className="flex items-center gap-x-2 md:gap-x-3">
            <ButtonModalSearch />
            <Link
              target="_blank"
              aria-label="github"
              href="https://github.com/ahmaddzidnii"
            >
              <FaGithub className="h-[1.2rem] w-[1.2rem] md:h-6 md:w-6" />
            </Link>
            <ModeToggle />
            <IconListAnime />
            <Suspense fallback={null}>
              <ProfileUser />
            </Suspense>
          </nav>
        </div>
      </div>
    </header>
  );
};
