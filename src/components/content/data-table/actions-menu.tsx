import { deleteResume } from "@/db/actions/resume";
import { Resume } from "@/db/schema/resume";
import { type Row } from "@tanstack/react-table";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Copy, Delete, Download, MoreHorizontal, Share } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast, useToast } from "@/components/ui/use-toast";

export function ActionsMenu({ row }: { row: Row<Resume> }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const { id } = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => {
            copyToClipboard(`${process.env.base_url}/resume/${id}`);
          }}
        >
          <Download />
          Download PDF
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => {
            toast({
              title: "Not yet implemented...",
              description: "This feature is not yet implemented.",
            });
          }}
        >
          <Share />
          Share Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => deleteResume(id)}
        >
          <Delete />
          Delete Resume
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
