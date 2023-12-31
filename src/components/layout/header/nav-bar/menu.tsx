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

const NavButton = ({ children }: { children: React.ReactNode }) => (
  <Button
    className="flex items-center justify-start gap-3 rounded-lg px-3 py-2 transition-all"
    variant="navlink"
    asChild
  >
    {children}
  </Button>
);

export function Menu({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "grid items-start px-4 text-lg font-medium md:flex md:items-center md:space-x-6 md:px-0 md:text-base md:font-normal",
        className,
      )}
    >
      <SignedIn>
        {[
          { href: "/dashboard", label: "Home" },
          { href: "/resume", label: "My Resumes" },
        ].map(({ href, label }, i) => (
          <NavButton key={i}>
            <Link href={href}>{label}</Link>
          </NavButton>
        ))}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        {[SignUpButton, SignInButton].map((Comp, i) => (
          <NavButton key={i}>
            <Comp />
          </NavButton>
        ))}
      </SignedOut>
    </nav>
  );
}
