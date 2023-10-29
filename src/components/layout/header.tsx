"use client";

import { useWindowScroll } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";

export default function Header({ children }: { children: React.ReactNode }) {
  const [{ y }] = useWindowScroll();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full px-6 py-4 transition-colors duration-300",
        !!y ? "bg-background" : "bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
