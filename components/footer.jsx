import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="z-[200] mt-5 w-full border bg-background py-6 dark:bg-[#1f1f1f]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center px-2  md:justify-between 2xl:px-0">
        <Link href="/" className=" hidden md:block">
          <div className="relative flex h-[30px] w-[100px] items-center">
            <Image
              priority={true}
              src="/animefy.png"
              alt="logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
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
