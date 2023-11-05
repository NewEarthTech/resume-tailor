import deleteResume from "@/db/actions/resume/delete";
import { Resume } from "@/db/schema/resume";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
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
import { Separator } from "@/components/ui/separator";
import { toast, useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";

export function ActionsMenu({ row }: { row: Row<Resume> }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const { id } = row.original;

  const actions = [
    {
      label: "Download PDF",
      Icon: Download,
      action: () => {
        copyToClipboard(`${process.env.base_url}/resume/${id}`);
      },
    },
    {
      label: "Share Link",
      Icon: Share,
      action: () =>
        toast({
          title: "Not yet implemented...",
          description: "This feature is not yet implemented.",
        }),
    },
    {},
    {
      label: "Delete Resume",
      Icon: Delete,
      action: () => {
        deleteResume(id);
      },
    },
  ];

  return (
    <>
      <div className="hidden items-center justify-end xl:flex">
        {actions.map(({ label, Icon, action }, i) => {
          if (!action)
            return (
              <Separator
                key={`mobile-seperator-${i}`}
                className="mx-2 h-5"
                orientation="vertical"
              />
            );
          return (
            <TooltipProvider key={`resume-listing-item-action-${i}`}>
              <Tooltip>
                <Button
                  onClick={action}
                  variant="ghost"
                  className="mx-1 aspect-square"
                  size="icon"
                  asChild
                >
                  <TooltipTrigger>{Icon ? <Icon /> : null}</TooltipTrigger>
                </Button>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      <DropdownMenu>
        <Button variant="ghost" asChild className="h-8 w-8 p-0">
          <DropdownMenuTrigger className="block xl:hidden">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {actions.map(({ label, Icon, action }, i) => {
            if (!action)
              return <Separator className="my-2" key={`separator-${i}`} />;
            return (
              <DropdownMenuItem
                key={`resume-listing-item-action-${i}`}
                className="flex cursor-pointer items-center gap-2"
                onClick={action}
              >
                {Icon ? <Icon /> : null}
                {label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
