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
import { FaList } from "react-icons/fa6";
import { useRouter } from "@bprogress/next";
import { useIsClient } from "usehooks-ts";

export const ProfileUser = () => {
  const pathname = usePathname();
  const { isSignedIn } = useSession();
  const router = useRouter();
  const isClient = useIsClient();

  if (!isClient) {
    return <Skeleton className="size-[1.5rem]  rounded-full" />;
  }

  return (
    <>
      <ClerkLoading>
        <Skeleton className="h-[1.5rem] w-[1.5rem] rounded-full bg-slate-300 md:h-7 md:w-7" />
      </ClerkLoading>
      <ClerkLoaded>
        {isSignedIn ? (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-[1.5rem] w-[1.5rem] md:w-7 md:h-7",
                userButtonPopoverActionButton:
                  "dark:text-white hover:dark:text-white dark:hover:bg-slate-700/50",
                userButtonPopoverCustomItemButton:
                  "dark:text-white hover:dark:text-white dark:hover:bg-slate-700/50",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Action
                label="Your Animelist"
                labelIcon={<FaList />}
                onClick={() => router.push("/lists")}
              />
            </UserButton.MenuItems>
          </UserButton>
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
