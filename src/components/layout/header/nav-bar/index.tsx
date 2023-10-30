import Link from "next/link";
import { insertResume } from "@/db/actions/resume";
import { MenuIcon, PencilRuler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Header from "../header";
import { Menu } from "./menu";

export function NavBar({ className }: { className?: string }) {
  return (
    <Header>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-5 sm:flex-row">
          <Logo className="" />
          <form action={insertResume}>
            <Button
              variant="default"
              className="my-4 hidden text-sm sm:[display:inherit]"
              type="submit"
            >
              Create resume
            </Button>
          </form>
        </div>
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
