"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";

import { iconLinks, pageLinks } from "@/constants";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-primary" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center">
        {/* logo */}
        <div className="mt-28 mb-16 md:mb-40 text-center text-2xl">
          <Link href={"/"}>
            <SheetClose className="flex items-center">
              <Image
                src={"../icons/logo.svg"}
                alt="ComfyFurniture Logo"
                width={30}
                height={30}
              />

              <h1 className="font-bold">ComfyFurniture</h1>
            </SheetClose>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col items-center">
          <div className="flex flex-col justify-center items-center gap-8">
            {pageLinks.map((link, index) => {
              return (
                <Link
                  href={link.url}
                  key={index}
                  className={`${
                    link.url === pathname &&
                    "text-primary border-b-2 border-primary"
                  }text-xl capitalize hover:text-primary transition-all`}
                >
                  <SheetClose className="capitalize">{link.page}</SheetClose>
                </Link>
              );
            })}
          </div>
          <div className="flex space-x-4 mt-12">
            {iconLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-gray-600 hover:text-primary transition-all"
              >
                <SheetClose>
                  <Image
                    src={link.icon}
                    alt={link.url}
                    width={25}
                    height={25}
                    className="hover:text-primary"
                  />
                </SheetClose>
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
