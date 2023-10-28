import Link from "next/link";
import { PencilRuler } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export function Logo({ className }: { className?: string }) {
  return (
    <Button
      className={cn("flex flex-row gap-3 text-lg font-bold", className)}
      variant="ghost"
      asChild
    >
      <Link href="/">
        <PencilRuler className="h-6 w-6" />
        Resume Tailor
      </Link>
    </Button>
  );
}
