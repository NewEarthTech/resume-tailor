import Link from "next/link";
import { Resume } from "@/db/schema/resume";
import { Row } from "@tanstack/react-table";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ToggleCopyIcon } from "@/components/ui/toggle-copy-icon";

export function URLCell({ row }: { row: Row<Resume> }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const url = row.original.custom_url;
  const id = row.getValue("id")?.toString();
  if (!url && !id) return null;
  const href = `${process.env.base_url}/resume/${url ? url : id}`;
  return (
    <div className="flex items-center">
      <Button
        key={href}
        className="overflow-x-scroll whitespace-nowrap rounded-md text-xs"
        variant="link"
        asChild
      >
        <Link href={href} target="_blank">
          ./{url ? url : id}
        </Link>
      </Button>
      <ToggleCopyIcon textToCopy={href} variant="outline" className="" />
    </div>
  );
}
