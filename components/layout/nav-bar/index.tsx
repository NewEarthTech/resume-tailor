import Link from "next/link";
import { MenuIcon, PencilRuler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "./menu";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-transparent px-6 py-4">
      <Button
        className="flex flex-row gap-3 text-lg font-bold"
        variant="ghost"
        asChild
      >
        <Link href="/">
          <PencilRuler className="h-6 w-6" />
          Resume Tailor
        </Link>
      </Button>
      <Menu className="hidden md:flex" />
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="ghost">
            <MenuIcon />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-64" side="left">
          <Menu />
        </SheetContent>
      </Sheet>
    </header>
  );
}
