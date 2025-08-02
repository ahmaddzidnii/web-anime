import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className=" z-[200] mt-5 w-full border bg-background p-6 dark:bg-[#1f1f1f]">
      <div className="container-custom flex items-center justify-center md:justify-between">
        <Logo />
        <div className=" text-center text-muted-foreground">
          made with ❤️ by &nbsp;
          <Link target="_blank" href="https://github.com/ahmaddzidnii">
            ahmaddzidnii
          </Link>
        </div>
      </div>
    </footer>
  );
};
