import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { ProfileUser } from "@/components/auth/profile-user";
import { ButtonModalSearch } from "@/components/modal/modal-search/button-modal-search";

export const Navbar = () => {
  return (
    <header className="max-w-screen sticky top-0 z-50 w-full border-b bg-background px-2  py-3.5  shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-[#1f1f1f] dark:supports-[backdrop-filter]:bg-[#1f1f1f]/60 2xl:px-0">
      <div className="mx-auto flex max-w-[1400px] items-center">
        <Link href="/">
          <div className="flex items-center">
            <Image src="/animefy.png" width={100} height={30} alt="logo" />
          </div>
        </Link>
        <div className="ml-4 flex flex-1 items-center justify-end gap-x-2 md:ml-0 md:gap-x-5">
          <nav className="flex items-center gap-x-2 md:gap-x-3">
            <ButtonModalSearch />
            <ModeToggle />
            <Suspense fallback={null}>
              <ProfileUser />
            </Suspense>
          </nav>
        </div>
      </div>
    </header>
  );
};
