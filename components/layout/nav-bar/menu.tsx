import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/resume",
    label: "My Resumes",
  },
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
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Button
          className="flex items-center justify-start gap-3 rounded-lg px-3 py-2 transition-all"
          variant="link"
          asChild
        >
          <SignUpButton />
        </Button>
        <Button
          className="flex items-center justify-start gap-3 rounded-lg px-3 py-2 transition-all"
          variant="link"
          asChild
        >
          <SignInButton />
        </Button>
      </SignedOut>
    </nav>
  );
}
