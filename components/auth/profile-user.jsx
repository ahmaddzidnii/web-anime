"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineLogin } from "react-icons/ai";

import { Skeleton } from "@/components/ui/skeleton";

export const ProfileUser = () => {
  const pathname = usePathname();
  const { isSignedIn } = useSession();

  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-[1.5rem] w-[1.5rem] rounded-full bg-slate-300 md:h-7 md:w-7" />
      </ClerkLoading>
      <ClerkLoaded>
        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/auth/login?redirect_url=/anime"
            appearance={{
              elements: {
                userButtonAvatarBox: "h-[1.5rem] w-[1.5rem] md:w-7 md:h-7",
                userButtonPopoverActionButton:"text-white"
              },
            }}
          />
        ) : (
          <Link
            href={{
              pathname: "/auth/login",
              query: {
                redirect_url: pathname,
              },
            }}
            title="Login"
          >
            <AiOutlineLogin className="h-6 w-6" />
          </Link>
        )}
      </ClerkLoaded>
    </>
  );
};
