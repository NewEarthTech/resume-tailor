import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  {
    href: "/",
    label: "Home",
  },
  //   {
  //     href: "#",
  //     label: "About",
  //   },
  //   {
  //     href: "#",
  //     label: "Services",
  //   },
  //   {
  //     href: "#",
  //     label: "Contact",
  //   },
];

export function Menu({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "grid items-start px-4 text-lg font-medium md:flex md:items-center md:space-x-6 md:px-0 md:text-base md:font-normal",
        className,
      )}
    >
      {links.map(({ href, label }) => (
        <Button
          className="flex items-center justify-start gap-3 rounded-lg px-3 py-2 transition-all"
          key={href}
          variant="link"
          asChild
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
}
