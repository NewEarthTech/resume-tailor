"use client";

import { usePathname } from "next/navigation";
import { useWindowScroll } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";

export default function Header({ children }: { children: React.ReactNode }) {
  const [{ y }] = useWindowScroll();
  const isHome: boolean = usePathname() === "/";
  return (
    <header
      className={cn(
        "top-0 z-50 w-full px-6 py-4 transition-colors duration-1000 ease-out hover:bg-background hover:text-foreground",
        (!!y && y > 5) || !isHome
          ? "bg-background text-foreground"
          : "bg-transparent text-white",
        isHome ? "fixed" : "relative",
      )}
    >
      {children}
    </header>
  );
}
