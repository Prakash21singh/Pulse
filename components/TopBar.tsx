"use client";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

import { IconMenu3 } from "@tabler/icons-react";
import { links } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";

const TopBar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-between md:hidden text-white-1  px-6 py-3">
      <Image src={"/images/pulse.png"} alt="logo" width={52} height={52} />
      <Sheet>
        <SheetTrigger asChild>
          <IconMenu3 className="w-10 h-10 cursor-pointer" />
        </SheetTrigger>
        <SheetContent
          className="bg-[#122029] border-none flex flex-col items-start justify-normal px-4 py-2"
          side={"left"}>
          <Image src={"/images/pulse.png"} alt="logo" width={52} height={52} />
          {links.map((link) => {
            const isActive = link.href === pathname;

            return (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={` ${cn(
                    "w-full max-w-[260px] flex px-3 py-3 text-white-1 hover:bg-yellow-1/50 rounded-lg gap-3 transition-all hover:text-black-1",
                    {
                      "bg-yellow-1": isActive,
                    }
                  )}`}>
                  <div>{link.icon}</div>
                  <p>{link.title}</p>
                </Link>
              </SheetClose>
            );
          })}
          <div key={"logout"} className="absolute bottom-3 left-6">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default TopBar;
