import Link from "next/link";
import { MenuIcon, PencilRuler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Header from "../header";
import { Menu } from "./menu";

export function NavBar({ className }: { className?: string }) {
  return (
    <Header>
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Logo />
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
      </div>
    </Header>
  );
}
