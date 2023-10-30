import Link from "next/link";
import { PencilRuler } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export function Logo({ className }: { className?: string }) {
  return (
    <Button
      className={cn(
        "flex flex-row gap-3 text-xl font-bold sm:text-4xl",
        className,
      )}
      variant="navlink"
      asChild
    >
      <Link href="/">
        <PencilRuler className="sm:h-9 sm:w-9" />
        Resume Tailor
      </Link>
    </Button>
  );
}
